import { useEffect, useRef, useState } from "react";

const images = {
  boston:
    "https://images.unsplash.com/photo-1708201954288-224ae55a1564?auto=format&fit=crop&w=1800&q=85",
  street:
    "https://images.unsplash.com/photo-1766381854360-e4ab2f8f7291?auto=format&fit=crop&w=1400&q=85",
  library:
    "https://images.unsplash.com/photo-1625053376622-e462848c453f?auto=format&fit=crop&w=1600&q=85",
  books:
    "https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&w=1400&q=85",
  math: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1600&q=85",
  park: "https://images.unsplash.com/photo-1632148733234-f578440b11a6?auto=format&fit=crop&w=1600&q=85",
};

const quotes = [
  {
    line: "“It’s not your fault.”",
    note: "The hardest truth is sometimes the simplest.",
    speaker: "SEAN",
  },
  {
    line: "“You don’t know about real loss.”",
    note: "Knowledge can describe grief. Only living can know it.",
    speaker: "SEAN",
  },
  {
    line: "“I gotta go see about a girl.”",
    note: "At last, a choice made toward possibility.",
    speaker: "WILL",
  },
  {
    line: "“You’re sitting on a winning lottery ticket.”",
    note: "Loyalty can sound like a challenge.",
    speaker: "CHUCKIE",
  },
];

const people = [
  {
    name: "Will Hunting",
    role: "THE PRODIGY",
    text: "A mind without a ceiling, living inside walls built for survival. His wit protects him; his intelligence keeps everyone at a distance.",
    mark: "W",
  },
  {
    name: "Sean Maguire",
    role: "THE WITNESS",
    text: "He refuses to be impressed by performance. Sean meets Will not as a problem to solve, but as a person worth staying with.",
    mark: "S",
  },
  {
    name: "Chuckie Sullivan",
    role: "THE LOYALIST",
    text: "The friend who loves Will enough to imagine a life beyond their shared streets—even if that future leaves him behind.",
    mark: "C",
  },
  {
    name: "Skylar",
    role: "THE POSSIBILITY",
    text: "Warm, candid, and unwilling to accept a rehearsed version of him. She asks for the one thing genius cannot counterfeit: honesty.",
    mark: "S",
  },
  {
    name: "Gerald Lambeau",
    role: "THE EXPECTATION",
    text: "He sees a once-in-a-generation intellect and mistakes potential for obligation. His faith in Will is real, but incomplete.",
    mark: "L",
  },
];

const themes = [
  [
    "01",
    "Intelligence / Wisdom",
    "Knowing the answer is not the same as understanding the question.",
  ],
  [
    "02",
    "Knowledge / Experience",
    "A library can tell you about the Sistine Chapel. It cannot tell you what it felt like to stand there.",
  ],
  ["03", "Fear / Vulnerability", "The safest way to avoid abandonment is to leave first."],
  ["04", "Loyalty / Departure", "Real friendship may ask you to go where it cannot follow."],
  [
    "05",
    "Trauma / Healing",
    "What happened to you can explain your armour without becoming your identity.",
  ],
  ["06", "Talent / Choice", "A gift is not a debt. A life is still yours to choose."],
];

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={down ? "arrow down" : "arrow"}>
      <path d={down ? "M12 3v17M5 13l7 7 7-7" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

export default function App() {
  const [quote, setQuote] = useState(0);
  const [person, setPerson] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    const move = (event: MouseEvent) => {
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <div className="cursor" ref={cursor} />
      <header className="nav">
        <button className="monogram" onClick={() => scrollTo("top")} aria-label="Return to top">
          GWH
        </button>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "CLOSE" : "INDEX"}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <button onClick={() => scrollTo("film")}>The film</button>
          <button onClick={() => scrollTo("mind")}>The mind</button>
          <button onClick={() => scrollTo("people")}>The people</button>
          <button onClick={() => scrollTo("beyond")}>Beyond intelligence</button>
        </nav>
        <span className="nav-year">BOSTON · 1997</span>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src={images.boston}
          alt="A quiet historic Boston street lined with brick buildings"
        />
        <div className="hero-wash" />
        <div className="hero-number">01</div>
        <p className="hero-kicker">
          A film by Gus Van Sant <span>•</span> An informal study of potential
        </p>
        <div className="hero-title">
          <span>GOOD</span>
          <span>WILL</span>
          <span>HUNTING</span>
        </div>
        <div className="hero-bottom">
          <blockquote>“How do you like them apples?”</blockquote>
          <button onClick={() => scrollTo("film")} className="explore">
            BEGIN THE STUDY <Arrow down />
          </button>
        </div>
        <div className="equation eq-one">∫ f(x) dx = F(x) + C</div>
        <div className="scribble hero-note">the answer was never the problem</div>
      </section>

      <section className="manifesto paper-section">
        <div className="section-index">I — THE PREMISE</div>
        <p className="manifesto-copy reveal">
          Some people spend their lives <em>understanding the world,</em>
          <br />
          but never quite understand <em>themselves.</em>
        </p>
        <p className="margin-note scribble">intellect is not immunity</p>
      </section>

      <section className="film-section" id="film">
        <div className="film-photo reveal">
          <img src={images.library} alt="A shadowy old library lined with books" loading="lazy" />
          <span>fig. 01 / a room full of answers</span>
        </div>
        <div className="film-copy reveal">
          <div className="section-index light">II — THE FILM</div>
          <h2>
            A genius
            <br />
            in plain clothes.
          </h2>
          <p className="lead">
            South Boston. A twenty-year-old janitor solves a graduate-level mathematics problem left
            on an MIT blackboard. The solution is elegant. The person behind it is not so easily
            understood.
          </p>
          <p>
            Written by Matt Damon and Ben Affleck, the film resists the obvious prodigy story. Its
            true subject is not whether Will can fulfil his potential—but whether he can believe he
            deserves a life larger than the one pain has prepared him for.
          </p>
          <dl className="credits">
            <div>
              <dt>Released</dt>
              <dd>1997</dd>
            </div>
            <div>
              <dt>Directed by</dt>
              <dd>Gus Van Sant</dd>
            </div>
            <div>
              <dt>Written by</dt>
              <dd>
                Matt Damon
                <br />
                Ben Affleck
              </dd>
            </div>
            <div>
              <dt>Principal cast</dt>
              <dd>
                Robin Williams
                <br />
                Matt Damon
                <br />
                Ben Affleck
                <br />
                Minnie Driver
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mind-section" id="mind">
        <div className="mind-bg" style={{ backgroundImage: `url(${images.math})` }} />
        <div className="mind-header reveal">
          <div className="section-index light">III — THE MIND</div>
          <h2>
            The beautiful
            <br />
            problem of Will.
          </h2>
        </div>
        <div className="mind-grid">
          <div className="mind-statement reveal">
            <span className="big-number">1</span>
            <h3>He can see the structure beneath the noise.</h3>
            <p>
              Combinatorial mathematics, organic chemistry, obscure histories—Will moves through
              disciplines with startling ease. His memory retains what others labour to learn.
            </p>
          </div>
          <div className="chalk-card reveal">
            <p className="formula">G = (V, E)</p>
            <p className="formula small">∑ deg(v) = 2|E|</p>
            <span className="scribble">easy enough.</span>
          </div>
          <div className="mind-statement right reveal">
            <span className="big-number">2</span>
            <h3>He weaponises what he knows.</h3>
            <p>
              Knowledge is pleasure, power, and camouflage. He dismantles intellectual authority
              before it can judge him, always winning the argument and often losing the moment.
            </p>
          </div>
        </div>
        <button
          className="hidden-thought"
          onClick={(e) => e.currentTarget.classList.toggle("discovered")}
        >
          <span>?</span>
          <b>TOUCH THE MARGIN</b>
          <em>“What if the defence is also the prison?”</em>
        </button>
      </section>

      <section className="people-section" id="people">
        <div className="people-heading">
          <div className="section-index">IV — FIVE ORBITS</div>
          <h2>
            The people who
            <br />
            <em>refuse the disguise.</em>
          </h2>
        </div>
        <div className="people-layout">
          <div className="person-tabs" role="tablist" aria-label="Characters">
            {people.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                aria-selected={person === index}
                onClick={() => setPerson(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
                <Arrow />
              </button>
            ))}
          </div>
          <div className="person-detail" role="tabpanel" key={people[person].name}>
            <div className="person-mark">{people[person].mark}</div>
            <p className="person-role">{people[person].role}</p>
            <h3>{people[person].name}</h3>
            <p>{people[person].text}</p>
            <div className="scribble person-note">
              everyone teaches him
              <br />a different way to stay
            </div>
          </div>
        </div>
      </section>

      <section className="quotes-section" id="words">
        <div className="quote-photo">
          <img src={images.books} alt="Stacks of worn books in an old library" loading="lazy" />
        </div>
        <div className="quote-desk">
          <div className="section-index">V — WORDS WORTH KEEPING</div>
          <div className="quote-counter">
            0{quote + 1} / 0{quotes.length}
          </div>
          <blockquote key={quotes[quote].line}>{quotes[quote].line}</blockquote>
          <p className="quote-speaker">— {quotes[quote].speaker}</p>
          <p className="quote-note scribble">{quotes[quote].note}</p>
          <div className="quote-controls">
            <button
              aria-label="Previous quote"
              onClick={() => setQuote((quote - 1 + quotes.length) % quotes.length)}
            >
              ←
            </button>
            <div>
              {quotes.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Quote ${i + 1}`}
                  className={i === quote ? "active" : ""}
                  onClick={() => setQuote(i)}
                />
              ))}
            </div>
            <button aria-label="Next quote" onClick={() => setQuote((quote + 1) % quotes.length)}>
              →
            </button>
          </div>
        </div>
      </section>

      <section className="beyond-section" id="beyond">
        <div className="beyond-intro reveal">
          <div className="section-index light">VI — BEYOND INTELLIGENCE</div>
          <p>
            The film asks a more difficult question than <em>“What can you do?”</em>
          </p>
          <h2>
            What will you
            <br />
            allow yourself
            <br />
            to become?
          </h2>
        </div>
        <div className="theme-list">
          {themes.map(([num, title, text]) => (
            <article key={num} tabIndex={0}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>+</b>
            </article>
          ))}
        </div>
      </section>

      <section className="boston-section">
        <div className="boston-copy reveal">
          <div className="section-index light">VII — THE CITY</div>
          <h2>
            Boston is not
            <br />a backdrop.
          </h2>
          <p>
            It is brick, labour, institutions, neighbourhood loyalty, and the distance between
            Southie and Cambridge—a few miles that can feel like an entire social order.
          </p>
        </div>
        <div className="boston-gallery">
          <figure>
            <img
              src={images.street}
              alt="Historic cobblestone street and brick buildings"
              loading="lazy"
            />
            <figcaption>THE STREETS / inherited</figcaption>
          </figure>
          <figure>
            <img src={images.park} alt="An empty park bench under autumn trees" loading="lazy" />
            <figcaption>THE BENCH / where knowing ends</figcaption>
          </figure>
          <figure>
            <img src={images.library} alt="Shelves in an old academic library" loading="lazy" />
            <figcaption>THE INSTITUTION / invited, not owned</figcaption>
          </figure>
        </div>
      </section>

      <footer className="closing">
        <p className="closing-note scribble">maybe the bravest thing is leaving</p>
        <div className="closing-title reveal">
          Your move,
          <br />
          <em>chief.</em>
        </div>
        <p>
          Intelligence can take you almost anywhere.
          <br />
          The rest requires courage.
        </p>
        <button onClick={() => scrollTo("top")}>
          RETURN TO THE BEGINNING <Arrow />
        </button>
        <div className="footer-line">
          <span>GOOD WILL HUNTING</span>
          <span>A CINEMATIC STUDY · 2025</span>
          <span>END / OR BEGINNING</span>
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: "15px",
              fontStyle: "italic",
              letterSpacing: "0.04em",
              opacity: 0.55,
            }}
          >
            Nivalis
          </span>
        </div>
      </footer>
    </main>
  );
}
