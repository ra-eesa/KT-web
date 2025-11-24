import HeaderNav from './components/HeaderNav';
import LogoHero from './components/LogoHero';
import SnakeMazeBackground from './components/SnakeMazeBackground';

function App() {
  return (
    <div className="min-h-screen bg-kt-black">
      <HeaderNav />
      
      <LogoHero />

      <main>
        {/* About Section - Dark Beige */}
        <section id="about" className="py-20 px-4 bg-kt-beige-dark">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-6">
              Who we are
            </h2>
            <p className="text-lg text-kt-grey-light leading-relaxed">
              Kabir Technologies is a small deep-tech studio focused on overlooked
              problems in architecture, agriculture, healthcare, biodiversity and space. 
              We design and build early-stage AI-driven tools, then partner, license or 
              spin them out once they prove their value.
            </p>
          </div>
        </section>

        {/* Philosophy Section - Darkest for contrast */}
        <section id="philosophy" className="py-20 px-4 bg-kt-black-accent relative overflow-hidden">
          <SnakeMazeBackground />
          <div className="max-w-6xl mx-auto relative" style={{ zIndex: 10, position: 'relative' }}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-8">
              Philosophy &amp; principles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-kt-cream leading-relaxed">
                  KT exists to build tools that quietly change how people work, not noisy 
                  demos that vanish in a year. We care about clarity, ethics and long-term utility.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Clarity over hype',
                    desc: 'We explain the problem and the prototype in plain language.',
                  },
                  {
                    title: 'Ethics before efficiency',
                    desc: 'We consider data, impact and governance from the start.',
                  },
                  {
                    title: 'Niche > mainstream',
                    desc: 'We choose sectors where a precise tool can have outsized leverage.',
                  },
                  {
                    title: 'Prototypes first, pitch decks later',
                    desc: 'We prefer showing something that runs to talking about what might exist.',
                  },
                ].map((principle, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-kt-forest/10 border border-kt-gold/20 hover:border-kt-gold/40 transition-colors duration-200"
                  >
                    <h3 className="font-display font-semibold text-kt-gold-light mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-kt-grey">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sectors Section - Dark Beige */}
        <section id="sectors" className="py-20 px-4 bg-kt-beige-dark">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-3">
                Where we play
              </h2>
              <p className="text-xl text-kt-gold">The Five Pillars</p>
              <p className="text-base text-kt-grey-light mt-4 max-w-3xl mx-auto">
                These are the domains where we see opportunity for thoughtful, leverageable tools. Each represents areas we're actively exploring and where we're eager to partner with domain experts.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Heritage & Architecture',
                  desc: 'Structural monitoring, digital preservation, and conservation planning for historic sites.',
                },
                {
                  name: 'Agriculture & Water Systems',
                  desc: 'Water equity, irrigation optimization, and climate-adaptive farming practices.',
                },
                {
                  name: 'Healthcare & Diagnostics',
                  desc: 'Early detection, clinical decision support, and pattern recognition in medical data.',
                },
                {
                  name: 'Biodiversity & Climate',
                  desc: 'Habitat tracking, ecosystem health assessment, and conservation prioritization.',
                },
                {
                  name: 'Space & Frontier Systems',
                  desc: 'Orbital logistics, mission planning, and extreme environment operations.',
                },
              ].map((sector, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-kt-black border border-kt-gold/20 hover:border-kt-gold/50 hover:shadow-lg hover:shadow-kt-gold/5 transition-all duration-300"
                >
                  <h3 className="font-display font-semibold text-kt-gold-light text-lg mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-kt-grey">{sector.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KT Lab Section - Darkest */}
        <section id="lab" className="py-20 px-4 bg-kt-black-accent relative overflow-hidden">
          <SnakeMazeBackground />
          <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10, position: 'relative' }}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-6">
              KT Lab
            </h2>
            <div className="space-y-4 text-lg text-kt-cream leading-relaxed">
              <p>
                KT Lab is the internal proto-lab where new tools are born. Some
                experiments stay on the shelf; others become candidates for
                spin-outs, licensing or deeper partnerships.
              </p>
              <p>
                As the studio grows, this area will become a gallery of prototypes –
                each with its own story, sector and ideal partner.
              </p>
            </div>
          </div>
        </section>

        {/* Approach Section - Dark */}
        <section id="approach" className="py-20 px-4 bg-kt-black-lighter relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-12 text-center">
              Approach
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discover',
                  desc: 'We listen, map the workflow, and surface the most leverageable pain-points.',
                },
                {
                  step: '02',
                  title: 'Prototype',
                  desc: 'We design and build a working prototype in a controlled environment.',
                },
                {
                  step: '03',
                  title: 'Validate',
                  desc: 'We run a small pilot, measure outcomes, and refine with your team.',
                },
                {
                  step: '04',
                  title: 'Scale / Exit',
                  desc: 'We help you integrate, or license/spin-out the tool while KT retains a share.',
                },
              ].map((phase) => (
                <div key={phase.step} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-display font-bold text-lg">
                      {phase.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-kt-gold-light text-lg mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-kt-grey leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Darkest */}
        <section id="contact" className="py-20 px-4 bg-kt-black-accent relative overflow-hidden">
          <SnakeMazeBackground />
          <div className="max-w-4xl mx-auto text-center relative" style={{ zIndex: 10, position: 'relative' }}>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-gold-light mb-6">
              Work with us
            </h2>
            <p className="text-lg text-kt-cream leading-relaxed mb-8">
              Tell us about your sector, your problem, and what a successful prototype would look like.
            </p>
            <a
              href="mailto:hello@kabirtechnologies.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-kt-gold-light to-kt-gold text-white font-medium rounded-xl hover:shadow-lg hover:shadow-kt-gold/30 hover:scale-105 transition-all duration-200"
            >
              contact information coming soon
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-kt-black text-kt-grey py-8 px-4 border-t border-kt-gold/10">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Kabir Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;