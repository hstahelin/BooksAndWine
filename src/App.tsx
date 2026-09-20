import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

function SubscribeForm() {
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
        body: JSON.stringify({ email: data.get("email") }),
      });
      const result: unknown = await response.json();
      const responseMessage =
        typeof result === "object" && result !== null && "message" in result
          ? result.message
          : undefined;
      const responseError =
        typeof result === "object" && result !== null && "error" in result
          ? result.error
          : undefined;

      if (!response.ok) {
        throw new Error(
          typeof responseError === "string"
            ? responseError
            : "Please try again in a moment.",
        );
      }

      setState("success");
      setMessage(
        typeof responseMessage === "string"
          ? responseMessage
          : "You’re on the list.",
      );
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Please try again in a moment.",
      );
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
      <div className="email-row">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
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

export function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Books and Wine home">
          <img
            src="/books-and-wine-mark.png"
            alt=""
            width="52"
            height="52"
          />
          <span>
            Books <i>&amp;</i> Wine
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a className="nav-note" href="#notify">
            Notify me <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <span>Books &amp; Wine</span>
          <span>Coming soon</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A new chapter is taking shape</p>
          <h1>
            Something worth
            <br />
            <em>waiting for.</em>
          </h1>
          <p className="lede">
            A place for thoughtful reads, memorable bottles, and the
            conversations that begin when the two meet.
          </p>
        </div>
        <div className="hero-side">
          <span className="vertical-word">Pour slowly</span>
          <div className="edition-mark" aria-hidden="true">
            B<span>&amp;</span>W
          </div>
          <a href="#notify" className="round-link" aria-label="Join the mailing list">
            <ArrowDownRight size={26} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <p className="section-label">Opening soon</p>
        <p className="about-copy">
          We’re creating a home for books that linger, wines with a story, and
          pairings that make both feel new. The first issue is on its way.
        </p>
      </section>

      <section className="notify" id="notify">
        <div className="notify-heading">
          <p className="section-label">Stay in the loop</p>
          <h2>
            Be first
            <br />
            to the table.
          </h2>
        </div>
        <div className="notify-form-wrap">
          <p>
            Leave your email and we’ll let you know when Books &amp; Wine goes
            live, along with the occasional note from behind the scenes.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <img
            src="/books-and-wine-mark.png"
            alt=""
            width="42"
            height="42"
          />
          <span>
            Books <i>&amp;</i> Wine
          </span>
        </a>
        <p>A new journal of reading, drinking, and good conversation.</p>
        <p>© {new Date().getFullYear()} Books &amp; Wine</p>
      </footer>
    </main>
  );
}
