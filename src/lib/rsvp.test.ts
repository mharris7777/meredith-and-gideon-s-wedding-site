import { afterEach, expect, it, vi } from "vitest";
import { lookupInvitation, submitRSVP } from "./rsvp";
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
const data = { name: " Jane Smith ", invitationId: "household-1", token: "signed-token", attending: "accepts", dietary: "Vegetarian", message: "Hello", submissionId: "submission-1" };
const invitation = { id: "household-1", names: ["Jane Smith", "John Smith"], guestCount: 2, matchedName: "Jane Smith", token: "signed-token" };
it("looks up one name without downloading the guest list", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ invitation })));
  vi.stubGlobal("fetch", fetchMock);
  expect(await lookupInvitation("https://example.com/exec", " Jane Smith ")).toEqual(invitation);
  expect(Object.fromEntries(fetchMock.mock.calls[0][1].body)).toEqual({ action: "lookup", name: "Jane Smith", website: "" });
});
it.each([{ error: "No match" }, {}, { invitation: { ...invitation, guestCount: 7 } }, { invitation: { ...invitation, token: "" } }])("rejects lookup errors and invalid invitation data", async response => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(response))));
  await expect(lookupInvitation("https://example.com/exec", "Jane Smith")).rejects.toThrow();
});
it("sends a signed invitation without email or a client-controlled guest count", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response("OK")); vi.stubGlobal("fetch", fetchMock);
  await submitRSVP("https://example.com/exec", data);
  const body = fetchMock.mock.calls[0][1].body;
  expect(body.get("invitationId")).toBe(data.invitationId); expect(body.get("token")).toBe(data.token);
  expect(body.has("email")).toBe(false); expect(body.has("guests")).toBe(false);
});
it("clears dietary restrictions when declining", async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response("OK")); vi.stubGlobal("fetch", fetchMock);
  await submitRSVP("https://example.com/exec", { ...data, attending: "declines" });
  expect(fetchMock.mock.calls[0][1].body.get("dietary")).toBe("");
});
it.each([new Response("ERROR"), new Response("Invalid submission"), new Response("<html>Sign in</html>"), new Response("OK", { status: 500 })])("rejects unconfirmed saves", async response => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response)); await expect(submitRSVP("https://example.com/exec", data)).rejects.toThrow();
});
it("rejects missing configuration", async () => { await expect(lookupInvitation(undefined, "Jane Smith")).rejects.toThrow(); });
it("aborts stalled requests", async () => {
  vi.useFakeTimers(); vi.stubGlobal("fetch", vi.fn((_url, options) => new Promise((_resolve, reject) => { options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError"))); })));
  const pending = expect(submitRSVP("https://example.com/exec", data)).rejects.toThrow("Aborted");
  await vi.advanceTimersByTimeAsync(20000); await pending;
});
