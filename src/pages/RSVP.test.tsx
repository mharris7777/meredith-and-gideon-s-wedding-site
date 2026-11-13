import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import RSVP from "./RSVP";
import { lookupInvitation, submitRSVP } from "@/lib/rsvp";
vi.mock("@/lib/rsvp", () => ({ lookupInvitation: vi.fn(), submitRSVP: vi.fn() }));
vi.mock("@/components/Navigation", () => ({ default: () => null }));
afterEach(() => { cleanup(); vi.resetAllMocks(); });
const invitation = { id: "household-1", names: ["Jane Smith", "John Smith", "Child Smith"], guestCount: 3, matchedName: "Jane Smith", token: "signed" };
async function find() {
  vi.mocked(lookupInvitation).mockResolvedValue(invitation);
  render(<RSVP />);
  expect(screen.queryByRole("button", { name: "Send RSVP" })).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Jane Smith" } });
  fireEvent.submit(screen.getByRole("button", { name: "Find My Invitation" }).closest("form")!);
  await screen.findByText("Your Invitation");
}
it("finds the full household and sends its invitation ID without email or editable count", async () => {
  await find();
  expect(screen.getByText("Child Smith")).toBeInTheDocument();
  expect(screen.queryByLabelText("Email Address")).not.toBeInTheDocument();
  expect(screen.queryByLabelText("Number of Guests")).not.toBeInTheDocument();
  vi.mocked(submitRSVP).mockResolvedValue(undefined);
  fireEvent.click(screen.getByRole("button", { name: "Send RSVP" }));
  await screen.findByText("Thank You!");
  expect(vi.mocked(submitRSVP).mock.calls[0][1]).toEqual(expect.objectContaining({ invitationId: invitation.id, token: "signed", name: "Jane Smith", attending: "accepts" }));
});
it("keeps failed lookups on the search step", async () => {
  vi.mocked(lookupInvitation).mockRejectedValue(new Error("No matching invitation"));
  render(<RSVP />);
  fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Unknown Guest" } });
  fireEvent.submit(screen.getByRole("button", { name: "Find My Invitation" }).closest("form")!);
  expect(await screen.findByRole("alert")).toHaveTextContent("No matching invitation");
  expect(screen.queryByText("Your Invitation")).not.toBeInTheDocument();
});
it("keeps the invitation and reuses the submission ID after a failed save", async () => {
  await find();
  vi.mocked(submitRSVP).mockRejectedValueOnce(new Error("CORS")).mockResolvedValueOnce(undefined);
  fireEvent.change(screen.getByLabelText("Personal Message"), { target: { value: "Congratulations" } });
  fireEvent.click(screen.getByRole("button", { name: "Send RSVP" }));
  await screen.findByRole("alert");
  expect(screen.getByLabelText("Personal Message")).toHaveValue("Congratulations");
  fireEvent.click(screen.getByRole("button", { name: "Send RSVP" }));
  await screen.findByText("Thank You!");
  const calls = vi.mocked(submitRSVP).mock.calls;
  expect(calls[0][1].submissionId).toBeTruthy();
  expect(calls[1][1].submissionId).toBe(calls[0][1].submissionId);
});
it("prevents duplicate sends and supports declining the whole household", async () => {
  await find();
  let acknowledge!: () => void;
  vi.mocked(submitRSVP).mockImplementation(() => new Promise<void>(resolve => { acknowledge = resolve; }));
  fireEvent.click(screen.getByLabelText("Regretfully Declines"));
  const form = screen.getByRole("button", { name: "Send RSVP" }).closest("form")!;
  fireEvent.submit(form); fireEvent.submit(form);
  expect(submitRSVP).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
  acknowledge();
  await waitFor(() => expect(screen.getByText("Thank You!")).toBeInTheDocument());
  expect(screen.getByText(/We'll miss you/)).toBeInTheDocument();
});
