import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { RSVP_MESSAGES } from "@/lib/rsvp/constants";

vi.mock("@marsidev/react-turnstile", async () => {
  const { forwardRef, useImperativeHandle } = await import("react");
  type MockProps = { onSuccess?: (token: string) => void };
  return {
    Turnstile: forwardRef<unknown, MockProps>(function MockTurnstile({ onSuccess }, ref) {
      useImperativeHandle(ref, () => ({ reset: vi.fn() }));
      return <button type="button" onClick={() => onSuccess?.("XXXX.DUMMY.TOKEN.XXXX")}>Complete security check</button>;
    }),
  };
});

const formProps = {
  confirmationCopy: "Your response has been received.",
  turnstileSiteKey: "1x00000000000000000000AA",
};

function completeForm() {
  fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Codex RSVP Test" } });
  fireEvent.click(screen.getByLabelText("Joyfully accepts"));
  fireEvent.click(screen.getByRole("button", { name: "Complete security check" }));
}

describe("guest RSVP form states", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("announces a validation error without sending an invalid request", () => {
    const request = vi.fn();
    vi.stubGlobal("fetch", request);
    render(<RsvpForm {...formProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    expect(screen.getByRole("alert")).toHaveTextContent(RSVP_MESSAGES.invalidResponse);
    expect(request).not.toHaveBeenCalled();
  });

  it("requires a completed security check before sending", () => {
    const request = vi.fn();
    vi.stubGlobal("fetch", request);
    render(<RsvpForm {...formProps} />);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Codex RSVP Test" } });
    fireEvent.click(screen.getByLabelText("Joyfully accepts"));

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    expect(screen.getByRole("alert")).toHaveTextContent(RSVP_MESSAGES.verificationRequired);
    expect(request).not.toHaveBeenCalled();
  });

  it("shows a disabled loading state while a submission is pending", () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => undefined)));
    render(<RsvpForm {...formProps} />);
    completeForm();

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    expect(screen.getByRole("button", { name: "Submitting…" })).toBeDisabled();
    expect(screen.getByLabelText("Full name")).toBeDisabled();
  });

  it("renders the confirmation after a successful one-seat response", async () => {
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", request);
    render(<RsvpForm {...formProps} />);
    completeForm();

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    expect(await screen.findByRole("heading", { name: "Thank you" })).toBeInTheDocument();
    const payload = JSON.parse(String(request.mock.calls[0][1]?.body));
    expect(payload).toEqual({ guestName: "Codex RSVP Test", attendance: "attending", company: "", turnstileToken: "XXXX.DUMMY.TOKEN.XXXX" });
  });

  it.each([
    [RSVP_MESSAGES.rateLimited, 429],
    [RSVP_MESSAGES.unavailable, 503],
  ])("shows the safe API error for a failed request", async (message, status) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    })));
    render(<RsvpForm {...formProps} />);
    completeForm();

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(message));
  });

  it("replaces malformed server details with a generic message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not-json", { status: 500 })));
    render(<RsvpForm {...formProps} />);
    completeForm();

    fireEvent.click(screen.getByRole("button", { name: "Submit RSVP" }));

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(RSVP_MESSAGES.unavailable));
  });
});
