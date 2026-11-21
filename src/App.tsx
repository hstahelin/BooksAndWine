import { FormEvent, ReactNode, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredPairing, getAdjacentPairings, getPairing, pairings, type Pairing } from "./pairings";

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
      const responseMessage = typeof result === "object" && result !== null && "message" in result ? result.message : undefined;
      const responseError = typeof result === "object" && result !== null && "error" in result ? result.error : undefined;

      if (!response.ok) {
        throw new Error(typeof responseError === "string" ? responseError : "Please try again in a moment.");
      }
      setState("success");
      setMessage(typeof responseMessage === "string" ? responseMessage : "You’re on the list.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again in a moment.");
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
      <div className="email-row">
        <label className="sr-only" htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Email address" aria-describedby="consent-note form-status" required />
        <button type="submit" disabled={state === "submitting"}>
          <span>{state === "submitting" ? "Joining…" : "Join the list"}</span>
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>
      <p className="consent-note" id="consent-note">By subscribing, you agree to receive launch updates from Books &amp; Wine. You can unsubscribe at any time.</p>
      <p className={`form-status ${state === "error" ? "is-error" : ""}`} id="form-status" role="status" aria-live="polite">{message}</p>
    </form>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Books and Wine home">
        <img src="/books-and-wine-mark.png" alt="" width="52" height="52" />
        <span>Books <i>&amp;</i> Wine</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/journal">Journal</a>
        <a href="/#about">About</a>
        <a className="nav-note" href="/#notify">Notify me <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="/">
        <img src="/books-and-wine-mark.png" alt="" width="42" height="42" />
        <span>Books <i>&amp;</i> Wine</span>
      </a>
      <p>A new journal of reading, drinking, and good conversation.</p>
      <p>© {new Date().getFullYear()} Books &amp; Wine</p>
    </footer>
  );
}

function Page({ children }: { children: ReactNode }) {
  return <main><Header />{children}<Footer /></main>;
}

function HomePage() {
  return (
    <Page>
      <section className="hero feature-hero" id="top">
        <div className="hero-kicker"><span>Featured pairing</span><span>Issue No. {featuredPairing.number}</span></div>
        <div className="hero-copy feature-copy">
          <p className="eyebrow">Book &amp; wine pairing</p>
          <div className="feature-pairing-grid">
            <div className="feature-book">
              <h1>The Golden<br /><em>Compass.</em></h1>
              <p className="feature-byline">By: {featuredPairing.author}</p>
            </div>
            <div className="feature-wine">
              <span>Wine pairing</span>
              <strong>{featuredPairing.wine}</strong>
            </div>
          </div>
          <p className="lede">{featuredPairing.paragraphs[0]}</p>
          <a className="text-link" href={`/pairings/${featuredPairing.slug}`}>Read the pairing <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="hero-side">
          <span className="vertical-word">Read slowly</span>
          <div className="edition-mark" aria-hidden="true">B<span>&amp;</span>W</div>
          <a href={`/pairings/${featuredPairing.slug}`} className="round-link" aria-label="Read The Golden Compass pairing"><ArrowDownRight size={26} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="about" id="about">
        <p className="section-label">The journal</p>
        <div>
          <p className="about-copy">Books that linger. Wines with a story. Pairings that make both feel new.</p>
          <a className="text-link journal-link" href="/journal">Explore the journal <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section className="notify" id="notify">
        <div className="notify-heading"><p className="section-label">Stay in the loop</p><h2>Pull up<br />a chair.</h2></div>
        <div className="notify-form-wrap">
          <p>Leave your email and we’ll send the occasional new pairing and note from the table.</p>
          <SubscribeForm />
        </div>
      </section>
    </Page>
  );
}

function PairingCard({ pairing }: { pairing: Pairing }) {
  return (
    <article className="journal-card">
      <div className="card-number">{pairing.number}</div>
      <p className="pairing-label">Book &amp; wine pairing</p>
      <div className="card-pairing-grid">
        <div className="card-book">
          <h2>{pairing.title}</h2>
          <p className="card-byline">By: {pairing.author}</p>
        </div>
        <div className="card-wine">
          <span>Wine pairing</span>
          <strong>{pairing.wine}</strong>
        </div>
      </div>
      <p className="card-copy">{pairing.paragraphs[0]}</p>
      <a className="text-link" href={`/pairings/${pairing.slug}`}>Read the pairing <ArrowUpRight size={18} aria-hidden="true" /></a>
    </article>
  );
}

function JournalPage() {
  return (
    <Page>
      <section className="page-intro">
        <div><p className="section-label">The journal</p><h1>More from<br /><em>the table.</em></h1></div>
        <p>Thoughtful books, memorable bottles, and the conversations that begin when the two meet.</p>
      </section>
      <section className="journal-grid" aria-label="Pairings">
        {pairings.filter((pairing) => pairing.slug !== featuredPairing.slug).map((pairing) => <PairingCard pairing={pairing} key={pairing.slug} />)}
      </section>
      <section className="featured-return">
        <p className="section-label">Featured</p>
        <a href={`/pairings/${featuredPairing.slug}`}>
          <span className="featured-book">{featuredPairing.title}</span>
          <span className="featured-wine-name"><small>Wine pairing</small>{featuredPairing.wine}</span>
          <ArrowUpRight size={28} aria-hidden="true" />
        </a>
      </section>
    </Page>
  );
}

function PairingPage({ pairing }: { pairing: Pairing }) {
  const { previous, next } = getAdjacentPairings(pairing.slug);

  return (
    <Page>
      <article className="article-page">
        <header className="article-masthead">
          <a className="back-link" href="/journal"><ArrowLeft size={17} aria-hidden="true" /> Back to the journal</a>
          <div className="article-number">{pairing.number}</div>
          <div className="article-pairing-grid">
            <div className="article-book-panel">
              <p className="section-label">The book</p>
              <h1>{pairing.title}</h1>
              <p className="article-byline">By: {pairing.author}</p>
            </div>
            <div className="article-wine-panel">
              <p className="section-label">The wine</p>
              <h2>{pairing.wine}</h2>
            </div>
          </div>
        </header>
        <div className="article-layout">
          <div className="article-body">
            {pairing.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <aside className="article-visual" aria-label="Book and wine pairing visual">
            <div className="visual-frame">
              <span className="visual-number">{pairing.number}</span>
              <p>{pairing.title}</p>
              <i>&amp;</i>
              <strong>{pairing.wine}</strong>
            </div>
          </aside>
        </div>
        <nav className="article-navigation" aria-label="Pairing navigation">
          {previous ? (
            <a className="entry-nav previous-entry" href={`/pairings/${previous.slug}`}>
              <span><ArrowLeft size={18} aria-hidden="true" /> Previous entry</span>
              <strong>{previous.title}</strong>
              <small>{previous.wine}</small>
            </a>
          ) : <span />}
          {next ? (
            <a className="entry-nav next-entry" href={`/pairings/${next.slug}`}>
              <span>Next entry <ArrowRight size={18} aria-hidden="true" /></span>
              <strong>{next.title}</strong>
              <small>{next.wine}</small>
            </a>
          ) : <span />}
        </nav>
        <div className="article-closing">
          <div>{pairing.closing.map((line) => <p key={line}>{line}</p>)}</div>
          <p className="signature">Ana Reinemer</p>
          <a href="/">booksandwine.ca</a>
        </div>
      </article>
    </Page>
  );
}

function NotFoundPage() {
  return (
    <Page><section className="not-found"><p className="section-label">Page not found</p><h1>This page has<br /><em>left the table.</em></h1><a className="text-link" href="/">Return home <ArrowRight size={18} aria-hidden="true" /></a></section></Page>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return <HomePage />;
  if (path === "/journal") return <JournalPage />;
  if (path.startsWith("/pairings/")) {
    const pairing = getPairing(path.slice("/pairings/".length));
    return pairing ? <PairingPage pairing={pairing} /> : <NotFoundPage />;
  }
  return <NotFoundPage />;
}
