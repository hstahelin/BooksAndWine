"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export function SubscribeForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          company: data.get("company"),
        }),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Please try again in a moment.");
      }

      setState("success");
      setMessage(result.message || "You’re on the list.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again in a moment.");
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="email-row">
        <label className="sr-only" htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          aria-describedby="consent-note form-status"
          required
        />
        <button type="submit" disabled={state === "submitting"}>
          <span>{state === "submitting" ? "Joining…" : "Join the list"}</span>
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
      <p className="consent-note" id="consent-note">
        By subscribing, you agree to receive launch updates from Books & Wine.
        You can unsubscribe at any time.
      </p>
      <p
        className={`form-status ${state === "error" ? "is-error" : ""}`}
        id="form-status"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
