import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const notes = [
  {
    number: "01",
    type: "A classic, reconsidered",
    title: "The Great Gatsby & grower Champagne",
    copy: "Bright ambition, brittle glamour, and a finish that asks what the celebration cost.",
    meta: "F. Scott Fitzgerald · Chardonnay-led Champagne",
  },
  {
    number: "02",
    type: "A dark-weather pairing",
    title: "Frankenstein & Etna Rosso",
    copy: "Smoke, mineral tension, and a story about what happens after the spark catches.",
    meta: "Mary Shelley · Nerello Mascalese",
  },
  {
    number: "03",
    type: "A long-table read",
    title: "The Odyssey & skin-contact white",
    copy: "A restless journey met by texture, salt, and enough strangeness to keep the table talking.",
    meta: "Homer · Mediterranean field blend",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Books and Wine home">
          <Image src="/books-and-wine-mark.png" alt="" width={52} height={52} priority />
          <span>Books <i>&</i> Wine</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#pairings">Pairings</a>
          <a href="#about">About</a>
          <a className="nav-note" href="#notes">
            Read the notes <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <span>Issue No. 01</span>
          <span>Autumn / Winter</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">A journal for considered evenings</p>
          <h1>Good books.<br /><em>Better company.</em></h1>
          <p className="lede">
            Stories worth staying up for, paired with bottles that make the
            conversation last a little longer.
          </p>
        </div>
        <div className="hero-side">
          <span className="vertical-word">Read slowly</span>
          <div className="edition-mark" aria-hidden="true">B<span>&</span>W</div>
          <a href="#pairings" className="round-link" aria-label="Explore this issue">
            <ArrowDownRight size={26} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="manifesto" id="about">
        <p className="section-label">The idea</p>
        <p className="manifesto-copy">
          The best pairing isn’t about rules. It’s about resonance: a shared
          mood, an unexpected contrast, a detail that changes when two things
          meet. <strong>Books & Wine</strong> follows those connections.
        </p>
      </section>

      <section className="pairings" id="pairings">
        <div className="section-heading">
          <p className="section-label">On the table</p>
          <h2>Three pairings<br />for the first pour.</h2>
        </div>
        <div className="pairing-list" id="notes">
          {notes.map((note) => (
            <article className="pairing" key={note.number}>
              <span className="pairing-number">{note.number}</span>
              <div>
                <p className="pairing-type">{note.type}</p>
                <h3>{note.title}</h3>
                <p className="pairing-copy">{note.copy}</p>
                <p className="pairing-meta">{note.meta}</p>
              </div>
              <ArrowUpRight className="pairing-arrow" size={24} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="closing-note">
        <p className="section-label">A standing invitation</p>
        <blockquote>“Bring the book you can’t stop thinking about. We’ll find the bottle.”</blockquote>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <Image src="/books-and-wine-mark.png" alt="" width={42} height={42} />
          <span>Books <i>&</i> Wine</span>
        </a>
        <p>An independent journal of reading, drinking, and good conversation.</p>
        <p>© {new Date().getFullYear()} Books & Wine</p>
      </footer>
    </main>
  );
}
