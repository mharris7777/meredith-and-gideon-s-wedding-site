import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import RSVP from "./RSVP";
import { submitRSVP } from "@/lib/rsvp";
vi.mock("@/lib/rsvp", () => ({ submitRSVP: vi.fn() }));
vi.mock("@/components/Navigation", () => ({ default: () => null }));
vi.mock("@/components/PageHero", () => ({ default: () => null }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

it("keeps entered values on failure and reuses the submission ID on retry", async () => {
  vi.mocked(submitRSVP).mockRejectedValueOnce(new Error("CORS")).mockResolvedValueOnce(undefined);
  render(<RSVP />);
  fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Test Guest" } });
  expect(screen.queryByLabelText("Email Address")).not.toBeInTheDocument();
  fireEvent.submit(screen.getByRole("button", { name: "Send RSVP" }).closest("form")!);
  await screen.findByRole("alert");
  expect(screen.queryByText("Thank You!")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Full Name")).toHaveValue("Test Guest");
  fireEvent.submit(screen.getByRole("button", { name: "Send RSVP" }).closest("form")!);
  await waitFor(() => expect(screen.getByText("Thank You!")).toBeInTheDocument());
  const calls = vi.mocked(submitRSVP).mock.calls;
  expect(calls).toHaveLength(2);
  expect(calls[0][1].submissionId).toBeTruthy();
  expect(calls[1][1].submissionId).toBe(calls[0][1].submissionId);
});

it("prevents duplicate sends while awaiting acknowledgment", async () => {
  let acknowledge: () => void;
  vi.mocked(submitRSVP).mockImplementation(() => new Promise<void>(resolve => { acknowledge = resolve; }));
  render(<RSVP />);
  const form = screen.getByRole("button", { name: "Send RSVP" }).closest("form")!;
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(submitRSVP).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
  acknowledge!();
  await screen.findByText("Thank You!");
});
