import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import About from '../About';
import Philosophy from '../Philosophy';
import Sectors from '../Sectors';
import Lab from '../Lab';
import Approach from '../Approach';
import Credits from '../Credits';
import Contact from '../Contact';
import { sectors } from '../../data/sectors';
import { ventures } from '../../data/ventures';
import { PRINCIPLES, BUILD_STEPS } from '../../data/studio';

const exampleVentures = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `v${i}`,
    name: `Venture ${i}`,
    sector: sectors[i % sectors.length].id,
    tag: sectors[i % sectors.length].name,
    phase: { step: 1, label: 'In development' },
    logline: `Logline ${i}`,
  }));

describe('Scene 02 - About', () => {
  it('renders the studio statement and copy', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section#about')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /who we are/i })).toBeInTheDocument();
    expect(screen.getByText(/small deep-tech studio focused on overlooked problems/i)).toBeInTheDocument();
  });
});

describe('Scene 03 - Philosophy', () => {
  it('renders all four principles', () => {
    render(<Philosophy />);
    expect(screen.getByRole('heading', { name: /philosophy & principles/i })).toBeInTheDocument();
    PRINCIPLES.forEach((p) => {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
    });
  });

  it('draws the maze with one lit segment per principle', () => {
    const { container } = render(<Philosophy />);
    expect(container.querySelectorAll('.kt-maze-lit')).toHaveLength(PRINCIPLES.length);
  });
});

describe('Scene 04 - Five pillars', () => {
  it('renders every sector with its content from sectors.js', () => {
    render(<Sectors />);
    expect(screen.getByRole('heading', { name: /where we play/i })).toBeInTheDocument();
    sectors.forEach((s) => {
      expect(screen.getByRole('heading', { name: s.name })).toBeInTheDocument();
      expect(screen.getByText(s.strapline)).toBeInTheDocument();
      expect(screen.getByText(s.idealPartner)).toBeInTheDocument();
    });
  });

  it('labels each pillar with its colour grade', () => {
    render(<Sectors />);
    sectors.forEach((s, i) => {
      expect(screen.getByText(new RegExp(`Pillar 0${i + 1} / 05 · ${s.grade} grade`))).toBeInTheDocument();
    });
  });
});

describe('Scene 05 - KT Lab', () => {
  it('shows Aqvera with a link to its site', () => {
    render(<Lab />);
    expect(screen.getByRole('heading', { name: 'Aqvera' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit aqvera/i })).toHaveAttribute(
      'href',
      'https://aqvera.co.uk'
    );
    expect(screen.getByText('Phase 3 · Live')).toBeInTheDocument();
  });

  it('shows Aqvera\'s own picture, and the KT sector icon for ventures without branding', () => {
    const { container } = render(<Lab />);
    expect(container.querySelector('.kt-tc-icon')).toHaveAttribute('src', '/brand-aqvera-icon.svg');

    const { container: plain } = render(<Lab ventures={exampleVentures(1)} />);
    expect(plain.querySelector('.kt-tc-icon')).toHaveAttribute('src', sectors[0].icon);
  });

  it('no longer lists the special commission', () => {
    render(<Lab />);
    expect(screen.queryByText(/special commission/i)).not.toBeInTheDocument();
    expect(ventures.some((v) => /commission/i.test(v.tag))).toBe(false);
  });

  it('uses the feature layout for up to three ventures', () => {
    const { container } = render(<Lab ventures={exampleVentures(3)} />);
    expect(container.querySelector('#lab')).toHaveAttribute('data-layout', 'feature');
    expect(container.querySelectorAll('.kt-tc-wide')).toHaveLength(3);
  });

  it('switches to a reel for four to eight ventures', () => {
    const { container } = render(<Lab ventures={exampleVentures(5)} />);
    expect(container.querySelector('#lab')).toHaveAttribute('data-layout', 'reel');

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(5);
    fireEvent.click(tabs[3]);
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: 'Venture 3' })).toBeInTheDocument();
  });

  it('switches to a filterable index for nine or more ventures', () => {
    const { container } = render(<Lab ventures={exampleVentures(10)} />);
    expect(container.querySelector('#lab')).toHaveAttribute('data-layout', 'index');
    expect(container.querySelectorAll('.kt-tc-compact')).toHaveLength(10);

    fireEvent.click(screen.getByRole('button', { name: sectors[0].name }));
    expect(container.querySelectorAll('.kt-tc-compact')).toHaveLength(2);
  });
});

describe('Scene 06 - How we build', () => {
  it('renders the four build steps in order', () => {
    render(<Approach />);
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items.map((li) => within(li).getByRole('heading').textContent)).toEqual(
      BUILD_STEPS.map((s) => s.title)
    );
  });
});

describe('Scene 07 - Credits and contact', () => {
  it('credits the sectors and the lab ventures', () => {
    render(<Credits />);
    sectors.forEach((s) => expect(screen.getByText(s.name)).toBeInTheDocument());
    ventures.forEach((v) => expect(screen.getByText(v.name)).toBeInTheDocument());
  });

  it('has a single contact link to the studio email', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute(
      'href',
      'mailto:ra.eesa@kabirtechnologies.co.uk'
    );
    expect(screen.getByText('ra.eesa@kabirtechnologies.co.uk')).toBeInTheDocument();
  });
});
