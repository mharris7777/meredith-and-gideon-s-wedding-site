import { readFileSync } from "node:fs";
import vm from "node:vm";
import { createHmac } from "node:crypto";
import { expect, it } from "vitest";

function backend() {
  const headers = ["First Name", "Last Name", "Spouse/Partner's First Name", "Spouse/Partner's Last Name", "Child(ren) Names", "Invitation ID"];
  const tracker = [headers, ["Jane", "Smith", "John", "Smith", "Child Smith", "household-1"], ["Sam", "Jones", "", "", "", "household-2"]];
  const saved: unknown[][] = [];
  const properties = new Map<string, string>(), cache = new Map<string, string>();
  const trackerSheet = { getDataRange: () => ({ getValues: () => tracker }), getRange: (r: number, c: number) => ({ setValue: (v: string) => { tracker[r - 1][c - 1] = v; } }) };
  const responses = { getLastRow: () => saved.length + 1, appendRow: (r: unknown[]) => { saved.push(r); }, getRange: () => ({ getValues: () => saved.map(r => [r[7]]) }) };
  const script = { getProperty: (k: string) => properties.get(k), setProperty: (k: string, v: string) => properties.set(k, v) };
  const ctx = vm.createContext({
    console: { error: () => {} },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, hasLock: () => true, releaseLock: () => {} }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: (n: string) => n === "Guest Tracker" ? trackerSheet : responses }) },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: (text: string) => ({ text, setMimeType() { return this; } }) },
    PropertiesService: { getScriptProperties: () => script },
    CacheService: { getScriptCache: () => ({ get: (k: string) => cache.get(k), put: (k: string, v: string) => cache.set(k, v) }) },
    Utilities: {
      getUuid: () => "generated-id",
      base64EncodeWebSafe: (s: string | Uint8Array) => Buffer.from(s).toString("base64url"),
      base64DecodeWebSafe: (s: string) => Buffer.from(s, "base64url"),
      newBlob: (s: Uint8Array) => ({ getDataAsString: () => Buffer.from(s).toString() }),
      computeHmacSha256Signature: (s: string, key: string) => createHmac("sha256", key).update(s).digest(),
    },
  });
  vm.runInContext(readFileSync("Code.gs", "utf8"), ctx);
  const post = (parameter: Record<string, string>) => ctx.doPost({ parameter }).text;
  const lookup = (name: string) => JSON.parse(post({ action: "lookup", name }));
  return { tracker, saved, post, lookup, ctx };
}
it("looks up either partner or invited child and returns no addresses or full guest list", () => {
  const b = backend();
  for (const name of ["  JANE   SMITH ", "John Smith", "Child Smith"]) {
    const { invitation } = b.lookup(name);
    expect(invitation.id).toBe("household-1"); expect(invitation.names).toEqual(["Jane Smith", "John Smith", "Child Smith"]);
    expect(Object.keys(invitation).sort()).toEqual(["id", "names", "guestCount", "matchedName", "token"].sort());
  }
});
it("rejects unknown and ambiguous names without selecting a household", () => {
  const b = backend(); expect(b.lookup("Unknown Guest").invitation).toBeUndefined();
  b.tracker.push(["Jane", "Smith", "", "", "", "household-3"]);
  expect(b.lookup("Jane Smith").error).toMatch(/More than one/);
});
it("uses the permanent ID after row moves and derives the full household count server-side", () => {
  const b = backend(), { invitation } = b.lookup("John Smith");
  [b.tracker[1], b.tracker[2]] = [b.tracker[2], b.tracker[1]];
  const submission = { action: "submit", name: "John Smith", invitationId: invitation.id, token: invitation.token, attending: "accepts", guests: "99", submissionId: "submit-1" };
  expect(b.post(submission)).toBe("OK"); expect(b.saved[0][4]).toBe(3); expect(b.saved[0][2]).toBe(""); expect(b.saved[0][8]).toBe("household-1");
  expect(b.post(submission)).toBe("OK"); expect(b.saved).toHaveLength(1);
});
it("records a whole-household decline with zero guests and no dietary restrictions", () => {
  const b = backend(), { invitation } = b.lookup("Jane Smith");
  expect(b.post({ action: "submit", name: "Jane Smith", invitationId: invitation.id, token: invitation.token, attending: "declines", dietary: "Vegetarian", submissionId: "decline" })).toBe("OK");
  expect(b.saved[0][4]).toBe(0); expect(b.saved[0][5]).toBe("");
});
it("rejects forged or expired tokens and changed invitation membership", () => {
  const b = backend(), { invitation } = b.lookup("Jane Smith");
  const data = { action: "submit", name: "Jane Smith", invitationId: invitation.id, token: invitation.token, attending: "accepts", submissionId: "bad" };
  expect(b.post({ ...data, token: "forged" })).toBe("ERROR");
  expect(b.post({ ...data, invitationId: "household-2" })).toBe("ERROR");
  const expired = b.ctx.signPayload({ id: invitation.id, name: "Jane Smith", expires: 1 });
  expect(b.post({ ...data, token: expired })).toBe("ERROR");
  b.tracker[1][0] = "Janet";
  expect(b.post(data)).toBe("ERROR"); expect(b.saved).toHaveLength(0);
});
it("creates an ID for a newly imported household and supports the existing form during rollout", () => {
  const b = backend(); b.tracker[2][5] = "";
  expect(b.lookup("Sam Jones").invitation.id).toBe("generated-id");
  expect(b.post({ name: "Jane Smith", attending: "accepts", guests: "1", submissionId: "legacy" })).toBe("OK");
  expect(b.saved[0][4]).toBe(3);
});
