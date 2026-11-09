import { afterEach, describe, expect, it, vi } from "vitest";
import { submitRSVP } from "./rsvp";

const data = { name: " Test Guest ", email: " test@example.com ", attending: "accepts", guests: "5+", dietary: "Vegetarian", message: "Congratulations", submissionId: "test-id" };
afterEach(() => vi.unstubAllGlobals());

describe("RSVP transport", () => {
  it("maps all fields to the Apps Script form contract and requires OK", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("OK"));
    vi.stubGlobal("fetch", fetchMock);
    await submitRSVP("https://example.com/exec", data);
    const options = fetchMock.mock.calls[0][1];
    expect(options.method).toBe("POST");
    expect(options.mode).not.toBe("no-cors");
    expect(Object.fromEntries(options.body)).toEqual({ ...data, name: "Test Guest", email: "test@example.com", website: "" });
  });
  it("sends zero guests and no dietary restrictions for declines", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("OK"));
    vi.stubGlobal("fetch", fetchMock);
    await submitRSVP("https://example.com/exec", { ...data, attending: "declines" });
    expect(fetchMock.mock.calls[0][1].body.get("guests")).toBe("0");
    expect(fetchMock.mock.calls[0][1].body.get("dietary")).toBe("");
  });
  it.each([new Response("ERROR"), new Response("Invalid submission"), new Response("<html>Sign in</html>"), new Response("OK", { status: 500 })])("rejects unconfirmed saves", async response => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await expect(submitRSVP("https://example.com/exec", data)).rejects.toThrow();
  });
  it("rejects missing configuration and network/CORS errors", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(submitRSVP(undefined, data)).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
    await expect(submitRSVP("https://example.com/exec", data)).rejects.toThrow();
  });
});

it("aborts a stalled request rather than leaving the form sending forever", async () => {
  vi.useFakeTimers();
  vi.stubGlobal("fetch", vi.fn((_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
  })));
  try {
    const pending = expect(submitRSVP("https://example.com/exec", data)).rejects.toThrow("Aborted");
    await vi.advanceTimersByTimeAsync(20000);
    await pending;
  } finally {
    vi.useRealTimers();
  }
});
