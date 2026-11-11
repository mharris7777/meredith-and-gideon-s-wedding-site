create schema crossword_private;
revoke all on schema crossword_private from public, anon, authenticated;
create table crossword_private.puzzles (
  id text primary key,
  solution jsonb not null check (jsonb_typeof(solution) = 'object'),
  words jsonb not null check (jsonb_typeof(words) = 'array')
);
create table crossword_private.attempts (
  id uuid primary key default gen_random_uuid(), puzzle_id text not null references crossword_private.puzzles(id),
  token_hash bytea not null, display_name text not null check (char_length(display_name) between 2 and 32),
  responses jsonb not null default '{}', revision integer not null default 0,
  started_at timestamptz not null default clock_timestamp(), submitted_at timestamptz,
  checks integer not null default 0, correct_words integer not null default 0, total_words integer not null default 0,
  correct_letters integer not null default 0, total_letters integer not null default 0, elapsed_seconds integer not null default 0
);
create index crossword_attempt_ranking on crossword_private.attempts(puzzle_id, correct_words desc, checks, elapsed_seconds) where submitted_at is not null;
create table crossword_private.check_events (
  attempt_id uuid not null references crossword_private.attempts(id) on delete cascade,
  event_id uuid not null, primary key (attempt_id, event_id)
);
create table crossword_private.rate_buckets (id text primary key, count integer not null, expires_at timestamptz not null);
alter table crossword_private.puzzles enable row level security;
alter table crossword_private.attempts enable row level security;
alter table crossword_private.check_events enable row level security;
alter table crossword_private.rate_buckets enable row level security;
revoke all on all tables in schema crossword_private from public, anon, authenticated;

create function crossword_private.result(a crossword_private.attempts, show_score boolean default false)
returns jsonb language sql stable set search_path = '' as $$
  select jsonb_build_object('attemptId', a.id, 'displayName', a.display_name,
    'startedAt', floor(extract(epoch from a.started_at) * 1000)::bigint,
    'submittedAt', case when a.submitted_at is null then null else floor(extract(epoch from a.submitted_at) * 1000)::bigint end,
    'revision', a.revision, 'checks', a.checks,
    'elapsedSeconds', case when a.submitted_at is null then greatest(0, floor(extract(epoch from (now() - a.started_at)))::integer) else a.elapsed_seconds end
  ) || case when show_score or a.submitted_at is not null then jsonb_build_object(
    'correctWords', a.correct_words, 'totalWords', a.total_words, 'correctLetters', a.correct_letters, 'totalLetters', a.total_letters
  ) else '{}'::jsonb end;
$$;
revoke all on function crossword_private.result(crossword_private.attempts, boolean) from public, anon, authenticated;

create function public.cw_start(p_puzzle_id text, p_display_name text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  a crossword_private.attempts;
  name text := btrim(p_display_name);
  token text := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
  headers jsonb := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  bucket text;
  n integer;
begin
  if name is null or char_length(name) not between 2 and 32 or name ~ '[[:cntrl:]]' then raise exception 'Choose a display name between 2 and 32 characters'; end if;
  if not exists (select 1 from crossword_private.puzzles where id = p_puzzle_id) then raise exception 'Puzzle unavailable'; end if;
  bucket := encode(sha256(convert_to(coalesce(headers ->> 'x-forwarded-for', 'unknown') || '/' || floor(extract(epoch from now()) / 3600)::text, 'UTF8')), 'hex');
  insert into crossword_private.rate_buckets(id, count, expires_at) values(bucket, 1, now() + interval '1 day')
  on conflict(id) do update set count = crossword_private.rate_buckets.count + 1 returning count into n;
  if n > 1000 then raise exception 'Too many new attempts. Please try again later.'; end if;
  delete from crossword_private.rate_buckets where id in (select id from crossword_private.rate_buckets where expires_at < now() limit 100);
  insert into crossword_private.attempts(puzzle_id, display_name, token_hash) values(p_puzzle_id, name, sha256(convert_to(token, 'UTF8'))) returning * into a;
  return crossword_private.result(a) || jsonb_build_object('token', token, 'responses', '{}'::jsonb);
end;
$$;

create function public.cw_attempt(p_attempt_id uuid, p_token text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare a crossword_private.attempts;
begin
  select * into a from crossword_private.attempts where id = p_attempt_id and token_hash = sha256(convert_to(p_token, 'UTF8'));
  if not found then raise exception 'Attempt not found'; end if;
  return crossword_private.result(a) || jsonb_build_object('responses', a.responses);
end;
$$;

create function public.cw_save(p_attempt_id uuid, p_token text, p_responses jsonb, p_revision integer, p_action text default 'save', p_event_id uuid default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare a crossword_private.attempts; p crossword_private.puzzles; cw integer; cl integer;
begin
  if p_action not in ('save', 'check', 'submit') or p_action is null then raise exception 'Invalid action'; end if;
  if p_revision is null or p_revision < 1 or p_revision > 1000000 then raise exception 'Invalid revision'; end if;
  if p_responses is null or jsonb_typeof(p_responses) <> 'object' or pg_column_size(p_responses) > 20000 then raise exception 'Invalid responses'; end if;
  select * into a from crossword_private.attempts where id = p_attempt_id and token_hash = sha256(convert_to(p_token, 'UTF8')) for update;
  if not found then raise exception 'Attempt not found'; end if;
  if a.submitted_at is not null then return crossword_private.result(a, true); end if;
  select * into p from crossword_private.puzzles where id = a.puzzle_id;
  if exists (select 1 from jsonb_each(p_responses) e where not (p.solution ? e.key) or jsonb_typeof(e.value) <> 'string' or (e.value #>> '{}') !~ '^[A-Z]$') then raise exception 'Invalid answer cells'; end if;
  if p_revision >= a.revision then a.responses := p_responses; a.revision := p_revision; end if;
  if p_action = 'check' then
    if p_event_id is null then raise exception 'Check event required'; end if;
    insert into crossword_private.check_events(attempt_id, event_id) values(a.id, p_event_id) on conflict do nothing;
    select count(*)::integer into a.checks from crossword_private.check_events where attempt_id = a.id;
  end if;
  select count(*)::integer into cl from jsonb_each_text(p.solution) e where a.responses ->> e.key = e.value;
  select count(*)::integer into cw from jsonb_array_elements(p.words) w
    where not exists (select 1 from jsonb_array_elements_text(w -> 'cells') cell where (a.responses ->> cell.value) is distinct from (p.solution ->> cell.value));
  a.correct_words := cw; a.correct_letters := cl; a.total_words := jsonb_array_length(p.words);
  select count(*)::integer into a.total_letters from jsonb_object_keys(p.solution);
  if p_action = 'submit' then
    a.submitted_at := clock_timestamp(); a.elapsed_seconds := greatest(1, floor(extract(epoch from (a.submitted_at - a.started_at)))::integer);
  end if;
  update crossword_private.attempts set responses = a.responses, revision = a.revision, checks = a.checks,
    correct_words = a.correct_words, total_words = a.total_words, correct_letters = a.correct_letters,
    total_letters = a.total_letters, submitted_at = a.submitted_at, elapsed_seconds = a.elapsed_seconds where id = a.id;
  return crossword_private.result(a, p_action in ('check', 'submit'));
end;
$$;

create function public.cw_leaderboard(p_puzzle_id text)
returns jsonb language sql stable security definer set search_path = '' as $$
  with ranked as (
    select id, display_name, correct_words, total_words, checks, elapsed_seconds,
      rank() over(order by correct_words desc, checks asc, elapsed_seconds asc) as place
    from crossword_private.attempts where puzzle_id = p_puzzle_id and submitted_at is not null
  ), top_scores as (select * from ranked order by place, id limit 50)
  select jsonb_build_object('total', (select count(*) from ranked), 'rows', coalesce((
    select jsonb_agg(jsonb_build_object('attemptId', id, 'displayName', display_name, 'rank', place,
      'correctWords', correct_words, 'totalWords', total_words, 'checks', checks, 'elapsedSeconds', elapsed_seconds) order by place, id) from top_scores
  ), '[]'::jsonb));
$$;
revoke all on function public.cw_start(text, text), public.cw_attempt(uuid, text), public.cw_save(uuid, text, jsonb, integer, text, uuid), public.cw_leaderboard(text) from public;
grant execute on function public.cw_start(text, text), public.cw_attempt(uuid, text), public.cw_save(uuid, text, jsonb, integer, text, uuid), public.cw_leaderboard(text) to anon, authenticated;
