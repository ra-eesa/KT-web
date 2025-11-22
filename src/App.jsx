import HeaderNav from './components/HeaderNav';
import LogoHero from './components/LogoHero';

function App() {
  return (
    <div className="min-h-screen">
      <HeaderNav />
      
      <LogoHero />

      <main>
        {/* About Section - Light */}
        <section id="about" className="py-20 px-4 bg-kt-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-6">
              Who we are
            </h2>
            <p className="text-lg text-kt-navy/80 leading-relaxed">
              Kabir Technologies is a small deep-tech studio focused on overlooked
              problems in architecture, agriculture, healthcare, biodiversity and space. 
              We design and build early-stage AI-driven tools, then partner, license or 
              spin them out once they prove their value.
            </p>
          </div>
        </section>

        {/* Philosophy Section - White */}
        <section id="philosophy" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-8">
              Philosophy &amp; principles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-kt-navy/80 leading-relaxed">
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
                    className="p-4 rounded-xl bg-kt-cream border border-kt-gold/20 hover:border-kt-gold/40 transition-colors duration-200"
                  >
                    <h3 className="font-display font-semibold text-kt-navy mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-kt-navy/70">{principle.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sectors Section - Light */}
        <section id="sectors" className="py-20 px-4 bg-kt-cream">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-3">
                Where we play
              </h2>
              <p className="text-xl text-kt-navy/70">The Five Pillars</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Heritage & Architecture',
                  desc: 'Intelligent tools for fragile built heritage.',
                },
                {
                  name: 'Agriculture & Water Systems',
                  desc: 'Fair, transparent insight into land and water use.',
                },
                {
                  name: 'Healthcare & Diagnostics',
                  desc: 'Pattern recognition for subtle clinical signals.',
                },
                {
                  name: 'Biodiversity & Climate',
                  desc: 'Watching ecosystems on the edge.',
                },
                {
                  name: 'Space & Frontier Systems',
                  desc: 'Simulating routes beyond the obvious.',
                },
              ].map((sector, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-kt-gold/20 hover:border-kt-gold/50 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-display font-semibold text-kt-navy text-lg mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-kt-navy/70">{sector.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KT Lab Section - White */}
        <section id="lab" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-6">
              KT Lab
            </h2>
            <div className="space-y-4 text-lg text-kt-navy/80 leading-relaxed">
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

        {/* Approach Section - Light */}
        <section id="approach" className="py-20 px-4 bg-kt-cream">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-12 text-center">
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
                <div key={phase.step} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-kt-gold-light to-kt-gold flex items-center justify-center shadow-lg">
                    <span className="text-white font-display font-bold text-lg">
                      {phase.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-kt-navy text-lg mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-kt-navy/70 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - White */}
        <section id="contact" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-kt-navy mb-6">
              Work with us
            </h2>
            <p className="text-lg text-kt-navy/80 leading-relaxed mb-8">
              Tell us about your sector, your problem, and what a successful prototype would look like.
            </p>
            <a
              href="mailto:hello@kabirtechnologies.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-kt-gold-light to-kt-gold text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              hello@kabirtechnologies.com
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-kt-black text-kt-grey-light py-8 px-4 border-t border-kt-gold/10">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} Kabir Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;