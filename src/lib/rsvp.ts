export interface Invitation {
  id: string;
  names: string[];
  guestCount: number;
  matchedName: string;
  token: string;
}
export interface RSVPSubmission {
  name: string;
  invitationId: string;
  token: string;
  attending: string;
  dietary: string;
  message: string;
  submissionId: string;
}
async function post(endpoint: string | undefined, values: Record<string, string>) {
  if (!endpoint) throw new Error("RSVP endpoint is not configured");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: "POST", body: new URLSearchParams({ ...values, website: "" }), credentials: "omit", signal: controller.signal,
    });
    if (!response.ok) throw new Error("The RSVP service is unavailable. Please try again.");
    return await response.text();
  } finally { clearTimeout(timeout); }
}
export async function lookupInvitation(endpoint: string | undefined, name: string): Promise<Invitation> {
  const text = await post(endpoint, { action: "lookup", name: name.trim() });
  let result;
  try { result = JSON.parse(text); } catch { throw new Error("Invitation lookup is unavailable. Please try again or contact Meredith and Gideon."); }
  if (result.error) throw new Error(result.error);
  const invitation = result.invitation;
  if (!invitation || typeof invitation.id !== "string" || !invitation.id || !Array.isArray(invitation.names) || !invitation.names.length || !invitation.names.every((n: unknown) => typeof n === "string" && n.trim()) || invitation.guestCount !== invitation.names.length || typeof invitation.token !== "string" || !invitation.token || typeof invitation.matchedName !== "string") {
    throw new Error("We couldn't confirm your invitation. Please try again.");
  }
  return invitation;
}
export async function submitRSVP(endpoint: string | undefined, data: RSVPSubmission) {
  const response = await post(endpoint, { ...data, action: "submit", name: data.name.trim(), dietary: data.attending === "accepts" ? data.dietary : "" });
  if (response.trim() !== "OK") throw new Error("RSVP save was not acknowledged");
}
