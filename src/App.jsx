import './App.css'

function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Early-stage deep tech studio</div>

          <h1 className="hero-title">
            <span>Kabir Technologies</span>
          </h1>

          <p className="hero-lead">
            We design and build niche, high-leverage prototypes across heritage,
            agriculture, healthcare, biodiversity and space – then partner,
            license or spin them out once they prove real value.
          </p>

          <div className="hero-actions">
            <a href="#lab" className="button button-primary">
              Explore KT Lab
            </a>
            <a href="#contact" className="button button-ghost">
              Work with us
            </a>
          </div>

          <a href="#about" className="scroll-hint">
            Enter the maze ↓
          </a>
        </div>
      </header>

      <main className="content">
        <section id="about" className="section">
          <h2>Who we are</h2>
          <p>
            Kabir Technologies is a small deep-tech studio focused on overlooked
            but critical sectors. We take ideas from early concept to working
            prototype, then look for partners who can scale them in the real
            world.
          </p>
        </section>

        <section id="philosophy" className="section">
          <h2>Philosophy &amp; principles</h2>
          <p>
            We prefer depth over hype, narrow problems over vague missions, and
            field feedback over slideware. Each prototype is designed as
            something a real organisation could actually pick up and use.
          </p>
        </section>

        <section id="sectors" className="section section--pillars">
          <h2>Where we play</h2>
          <p>
            Five pillars anchor the studio. Each is a place where small, sharp
            tools can have outsized impact.
          </p>

          <ul className="pillars-grid">
            <li>
              <strong>Heritage &amp; architecture</strong>
              <span>Intelligent tools for fragile built heritage.</span>
            </li>
            <li>
              <strong>Agriculture &amp; water systems</strong>
              <span>Modelling water fairness, stress and resilience.</span>
            </li>
            <li>
              <strong>Healthcare &amp; diagnostics</strong>
              <span>Pattern recognition for subtle clinical signals.</span>
            </li>
            <li>
              <strong>Biodiversity &amp; climate</strong>
              <span>Watching ecosystems on the edge.</span>
            </li>
            <li>
              <strong>Space &amp; frontier systems</strong>
              <span>Simulating routes beyond the obvious.</span>
            </li>
          </ul>
        </section>

        <section id="lab" className="section">
          <h2>KT Lab</h2>
          <p>
            KT Lab is the internal proto-lab where new tools are born. Some
            experiments stay on the shelf; others become candidates for
            spin-outs, licensing or deeper partnerships.
          </p>
          <p>
            As the studio grows, this area will become a gallery of prototypes –
            each with its own story, sector and ideal partner.
          </p>
        </section>

        <section id="approach" className="section">
          <h2>Approach</h2>
          <p>
            Start with a sharp problem. Build the smallest demonstrable
            prototype. Put it in front of the right people. Refine until it is
            irresistible for at least one real buyer or partner.
          </p>
        </section>

        <section id="contact" className="section">
          <h2>Work with us</h2>
          <p>
            To explore a collaboration or a custom prototype, email{' '}
            <a href="mailto:hello@example.com">hello@example.com</a>. As the
            studio matures, this will evolve into a more structured intake form.
          </p>
        </section>
      </main>

      <footer className="footer">
        <small>
          © {new Date().getFullYear()} Kabir Technologies. All rights reserved.
        </small>
      </footer>
    </div>
  )
}

export default App
