/** Deploy as Web app: Execute as Me; Who has access: Anyone. */
const SPREADSHEET_ID = '10CN5CMjuJwtqT0e-azg8Ofe6_n_ep4IFiFk7ApxFPWM';
const TAB_NAME = 'Website RSVPs';

function textOutput(value) { return ContentService.createTextOutput(value); }
function jsonOutput(value) { return textOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function normalizeName(value) {
  return String(value || '').normalize('NFKC').toLowerCase().trim().replace(/\s+/g, ' ');
}
function trackerHouseholds(book) {
  const sheet = book.getSheetByName('Guest Tracker');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const col = title => {
    const index = headers.indexOf(title);
    if (index < 0) throw new Error('Missing Guest Tracker column: ' + title);
    return index;
  };
  const primaryFirst = col('First Name'), primaryLast = col('Last Name');
  const partnerFirst = col("Spouse/Partner's First Name"), partnerLast = col("Spouse/Partner's Last Name");
  const children = col('Child(ren) Names'), idColumn = col('Invitation ID');
  return values.slice(1).flatMap((row, index) => {
    if (!String(row[primaryFirst] || '').trim()) return [];
    const names = [String(row[primaryFirst] || '') + ' ' + String(row[primaryLast] || '')];
    if (row[partnerFirst]) names.push(String(row[partnerFirst]) + ' ' + String(row[partnerLast] || ''));
    String(row[children] || '').split(/[;,\n]/).map(s => s.trim()).filter(Boolean).forEach(s => names.push(s));
    return [{ id: String(row[idColumn] || ''), names: names.map(s => s.trim().replace(/\s+/g, ' ')), row: index + 2, idColumn: idColumn + 1, sheet }];
  });
}
function signingSecret() {
  const properties = PropertiesService.getScriptProperties();
  let secret = properties.getProperty('RSVP_SIGNING_SECRET');
  if (!secret) { secret = Utilities.getUuid() + Utilities.getUuid(); properties.setProperty('RSVP_SIGNING_SECRET', secret); }
  return secret;
}
function signPayload(payload) {
  const encoded = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  return encoded + '.' + Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(encoded, signingSecret()));
}
function verifyToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) throw new Error('Invalid invitation');
  const signature = Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(parts[0], signingSecret()));
  if (signature !== parts[1]) throw new Error('Invalid invitation');
  const payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString());
  if (!payload.expires || payload.expires < Date.now()) throw new Error('Invitation expired; please search again');
  return payload;
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  let action = '';
  try {
    const v = (e && e.parameter) || {};
    action = String(v.action || '');
    if (v.website) return textOutput('OK');
    const name = String(v.name || '').trim().slice(0, 200);
    if (!name || normalizeName(name).split(' ').length < 2) {
      return action === 'lookup' ? jsonOutput({ error: 'Enter your first and last name.' }) : textOutput('Invalid submission');
    }
    lock.waitLock(10000);
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    const households = trackerHouseholds(book);
    if (action === 'lookup') {
      const key = 'lookup-' + Utilities.base64EncodeWebSafe(normalizeName(name));
      const cache = CacheService.getScriptCache();
      const attempts = Number(cache.get(key) || 0);
      if (attempts >= 20) return jsonOutput({ error: 'Please wait a few minutes before trying again.' });
      cache.put(key, String(attempts + 1), 300);
      const matches = households.filter(h => h.names.some(n => normalizeName(n) === normalizeName(name)));
      if (matches.length !== 1) return jsonOutput({ error: matches.length ? 'More than one invitation matches that name. Please contact Meredith and Gideon.' : "We couldn't find your invitation. Try another invited household member's full name, or contact Meredith and Gideon." });
      const household = matches[0];
      if (!household.id) {
        household.id = Utilities.getUuid();
        household.sheet.getRange(household.row, household.idColumn).setValue(household.id);
      }
      const matchedName = household.names.find(n => normalizeName(n) === normalizeName(name));
      return jsonOutput({ invitation: { id: household.id, names: household.names, guestCount: household.names.length, matchedName, token: signPayload({ id: household.id, name: matchedName, expires: Date.now() + 2 * 60 * 60 * 1000 }) } });
    }
    if (action && action !== 'submit') return textOutput('Invalid submission');
    const attendance = String(v.attending || '');
    const submissionId = String(v.submissionId || '').slice(0, 100);
    if (!['accepts', 'declines'].includes(attendance) || !submissionId) return textOutput('Invalid submission');
    let household, savedName;
    if (action === 'submit') {
      const token = verifyToken(v.token);
      if (token.id !== v.invitationId) throw new Error('Invalid invitation');
      household = households.find(h => h.id === token.id);
      savedName = token.name;
      if (!household || !household.names.includes(savedName)) throw new Error('Invitation changed; please search again');
    } else {
      // Compatibility with the current live form during deployment.
      const matches = households.filter(h => h.names.some(n => normalizeName(n) === normalizeName(name)));
      if (matches.length !== 1) return textOutput('Invalid submission');
      household = matches[0];
      savedName = household.names.find(n => normalizeName(n) === normalizeName(name));
    }
    const sheet = book.getSheetByName(TAB_NAME);
    if (!sheet) throw new Error('Website RSVPs tab missing');
    const last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2, 8, last - 1, 1).getValues().some(row => row[0] === submissionId)) return textOutput('OK');
    const safe = value => { const s = String(value || '').slice(0, 2000); return /^[=+@-]/.test(s) ? "'" + s : s; };
    sheet.appendRow([new Date(), safe(savedName), '', attendance, attendance === 'accepts' ? household.names.length : 0, attendance === 'accepts' ? safe(v.dietary) : '', safe(v.message), submissionId, household.id]);
    return textOutput('OK');
  } catch (error) {
    console.error(error);
    return action === 'lookup' ? jsonOutput({ error: 'Unable to find your invitation right now. Please try again or contact Meredith and Gideon.' }) : textOutput('ERROR');
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
