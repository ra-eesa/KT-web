import HeaderNav from './components/HeaderNav';
import LogoHero from './components/LogoHero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Sectors from './components/Sectors';
import Lab from './components/Lab';
import Approach from './components/Approach';
import Credits from './components/Credits';
import Contact from './components/Contact';

// The site runs as seven scenes in scroll order (see each component's header comment)
function App() {
  return (
    <div className="min-h-screen bg-kt-black">
      <HeaderNav />

      <LogoHero />

      <main>
        <About />
        <Philosophy />
        <Sectors />
        <Lab />
        <Approach />
        <Credits />
        <Contact />
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
