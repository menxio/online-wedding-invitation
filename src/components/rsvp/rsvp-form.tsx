"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { RSVP_MESSAGES } from "@/lib/rsvp/constants";
import type { Attendance } from "@/lib/rsvp/schemas";

type RsvpFormProps = {
  confirmationCopy: string;
  turnstileSiteKey: string;
};

export function RsvpForm({ confirmationCopy, turnstileSiteKey }: RsvpFormProps) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const guestName = String(form.get("guestName") ?? "").trim();
    if (guestName.length < 2 || !attendance) {
      setError(RSVP_MESSAGES.invalidResponse);
      return;
    }
    if (!turnstileToken) {
      setError(RSVP_MESSAGES.verificationRequired);
      return;
    }

    setPending(true);
    let submitted = false;
    try {
      const response = await fetch("/api/rsvp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName, attendance, company: form.get("company"), turnstileToken }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setError(result?.error ?? RSVP_MESSAGES.unavailable);
        return;
      }
      submitted = true;
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(RSVP_MESSAGES.unavailable);
    } finally {
      setPending(false);
      if (!submitted) {
        setTurnstileToken("");
        turnstileRef.current?.reset();
      }
    }
  }

  if (complete) {
    return (
      <section className="mx-auto max-w-xl py-20 text-center sm:py-28" aria-live="polite">
        <p className="font-script text-4xl text-[#d7b66e] sm:text-5xl">With gratitude</p>
        <h1 className="mt-5 font-serif text-[clamp(3.5rem,14vw,6.5rem)] leading-none">Thank you</h1>
        <p className="mx-auto mt-7 max-w-md font-serif text-xl leading-8 text-white/75">{confirmationCopy}</p>
        <Link href="/" className="mt-10 inline-flex min-h-12 items-center border-b border-[#d7b66e] px-2 font-sans text-xs font-semibold tracking-[0.18em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d7b66e]">Return to invitation</Link>
      </section>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-xl text-left" noValidate>
      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="guest-name" className="block font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#d7b66e] uppercase">Full name</label>
      <input
        id="guest-name"
        name="guestName"
        required
        minLength={2}
        maxLength={160}
        autoComplete="name"
        disabled={pending}
        aria-describedby={error ? "rsvp-error" : undefined}
        className="mt-3 min-h-14 w-full min-w-0 border border-white/25 bg-white/8 px-4 font-serif text-lg text-white placeholder:text-white/35 focus:border-[#d7b66e] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        placeholder="Enter your full name"
      />

      <fieldset className="mt-8" disabled={pending} aria-describedby={error ? "rsvp-error" : undefined}>
        <legend className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#d7b66e] uppercase">Will you be joining us?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(["attending", "declining"] as const).map((value) => (
            <label key={value} className="flex min-h-16 cursor-pointer items-center gap-3 border border-white/20 bg-white/[0.045] px-4 transition has-[:checked]:border-[#d7b66e] has-[:checked]:bg-[#d7b66e]/12 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#d7b66e]">
              <input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} className="size-5 shrink-0 accent-[#d7b66e]" />
              <span className="font-serif text-lg leading-6">{value === "attending" ? "Joyfully accepts" : "Regretfully declines"}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 min-h-[4.1rem]">
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          onSuccess={(token) => {
            setTurnstileToken(token);
            setError((current) => (
              current === RSVP_MESSAGES.verificationRequired || current === RSVP_MESSAGES.verificationFailed
                ? ""
                : current
            ));
          }}
          onExpire={() => setTurnstileToken("")}
          onError={() => {
            setTurnstileToken("");
            setError(RSVP_MESSAGES.verificationFailed);
          }}
          options={{
            action: "rsvp_submit",
            appearance: "interaction-only",
            responseField: false,
            size: "flexible",
            theme: "dark",
          }}
        />
        <p className="mt-2 font-sans text-xs text-white/50" aria-live="polite">
          {turnstileToken ? "Security check complete." : "Completing security checkâ€¦"}
        </p>
      </div>

      <div className="mt-5 min-h-6" aria-live="polite">
        {error ? <p id="rsvp-error" role="alert" className="border-l-2 border-[#e9a8b1] pl-3 font-sans text-sm leading-6 text-[#ffdce1]">{error}</p> : null}
      </div>

      <button type="submit" disabled={pending} className="mt-5 min-h-14 w-full border border-[#d7b66e] bg-[#d7b66e] px-6 font-sans text-xs font-bold tracking-[0.18em] text-[#260a13] uppercase transition hover:bg-[#ead197] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-55">
        {pending ? "Submitting…" : "Submit RSVP"}
      </button>
      <p className="mt-4 text-center font-sans text-xs leading-5 text-white/50">One response reserves one seat. Responses cannot be edited after submission.</p>
    </form>
  );
}
