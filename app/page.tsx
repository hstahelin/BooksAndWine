import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { SubscribeForm } from "@/components/subscribe-form";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Books and Wine home">
          <Image
            src="/books-and-wine-mark.png"
            alt=""
            width={52}
            height={52}
            priority
          />
          <span>
            Books <i>&</i> Wine
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
          <span>Books & Wine</span>
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
            B<span>&</span>W
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
          <h2>Be first<br />to the table.</h2>
        </div>
        <div className="notify-form-wrap">
          <p>
            Leave your email and we’ll let you know when Books & Wine goes live,
            along with the occasional note from behind the scenes.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <Image src="/books-and-wine-mark.png" alt="" width={42} height={42} />
          <span>
            Books <i>&</i> Wine
          </span>
        </a>
        <p>A new journal of reading, drinking, and good conversation.</p>
        <p>© {new Date().getFullYear()} Books & Wine</p>
      </footer>
    </main>
  );
}
