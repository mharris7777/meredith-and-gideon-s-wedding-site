export interface RSVPSubmission {
  name: string;
  email?: string;
  attending: string;
  guests: string;
  dietary: string;
  message: string;
  submissionId: string;
}

export async function submitRSVP(endpoint: string | undefined, data: RSVPSubmission) {
  if (!endpoint) throw new Error("RSVP endpoint is not configured");
  const body = new URLSearchParams({
    ...data,
    name: data.name.trim(),
    email: (data.email ?? "").trim(),
    guests: data.attending === "accepts" ? data.guests : "0",
    dietary: data.attending === "accepts" ? data.dietary : "",
    website: "",
  });
  // A simple form POST avoids preflight. Never use no-cors: opaque responses
  // cannot distinguish a saved row from a server error or a sign-in page.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: "POST", body, credentials: "omit", signal: controller.signal,
    });
    if (!response.ok || (await response.text()).trim() !== "OK") {
      throw new Error("RSVP save was not acknowledged");
    }
  } finally {
    clearTimeout(timeout);
  }
}
