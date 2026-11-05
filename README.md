# Kabir Technologies Website

Official website for Kabir Technologies - a deep-tech studio focused on building AI-driven tools for overlooked problems in architecture, agriculture, healthcare, biodiversity, and space.

## 🌐 Live Site

[Visit Kabir Technologies](https://ra-eesa.github.io/KT-Web/)

## 🎨 Design Features

- **Cinematic Scroll Scenes**: The page plays as seven scenes in scroll order, from an opening shot of the pyramid to end credits
- **Opening Shot**: The pyramid draws itself, the sector marks fly into place, and hovering or tapping a mark pulls focus to that sector
- **Scalable KT Lab**: Each venture gets a title sequence generated from `src/data/ventures.js`, and the layout adapts to how many ventures exist
- **Responsive Design**: Fully responsive layout that works seamlessly across all device sizes
- **Gold & Dark Theme**: Sophisticated color scheme using gold accents on dark backgrounds
- **Smooth Scroll Navigation**: One-page layout with smooth scrolling between sections

## 🛠️ Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - For the gold dust in the opening shot
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📁 Project Structure

```
KT-Web/
├── public/           # Static assets (logo, favicon)
├── src/              # Source files
│   ├── components/   # One component per scene, plus TitleCard, LowerThird, GoldDust
│   ├── data/         # sectors.js, ventures.js, studio.js (page content)
│   ├── hooks/        # Scroll progress, in-view and media query hooks
│   ├── cinema.css    # Scene styles and the motion system
│   └── main.jsx      # Application entry point
├── index.html        # HTML entry point
├── vite.config.js    # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json      # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ra-eesa/KT-Web.git
cd KT-Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎯 Key Sections

- **About** - Introduction to Kabir Technologies
- **Philosophy** - Core principles and values
- **Sectors** - The five focus areas (Heritage & Architecture, Agriculture & Water Systems, Healthcare & Diagnostics, Biodiversity & Climate, Space & Frontier Systems)
- **KT Lab** - Internal prototype laboratory
- **How we build** - Four-step process (Identify, Build, Stress-test, Release)
- **Contact** - Get in touch

## 🎨 Custom Features

### Scenes

| Scene | Section | What moves |
| --- | --- | --- |
| 01 | Hero | Letterbox, pyramid draw, sector marks fly in, focus pull on hover/tap. Plays once per browser session. |
| 02 | About | Camera pushes through the apex while the statement rises in |
| 03 | Philosophy | A lit path routes through the maze and reaches each principle |
| 04 | Sectors | Pinned dive into the pyramid, one pillar per step, each with its own colour grade |
| 05 | KT Lab | Venture title sequences. 1–3 ventures: feature, 4–8: reel, 9+: filterable index |
| 06 | How we build | A gold mark travels the four-step track |
| 07 | Credits / Contact | Scroll-rolled credits, then the contact card |

Pinned scenes use `position: sticky` and `useScrollProgress`, which writes scroll progress to a `--p` CSS variable. Phones and short screens get unpinned layouts, and `prefers-reduced-motion` shows every scene in its final frame.

### Adding a venture

Add one entry to `src/data/ventures.js`. Its `sector` picks the icon and colour grade, and the Lab layout and the credits update automatically.

### Responsive Color System

Custom Tailwind color palette including:
- `kt-black` - Primary background
- `kt-gold` - Brand accent color
- `kt-cream` - Primary text color
- `kt-forest` - Green accent
- `kt-beige-dark` - Alternate background

## 🌍 Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. Any push to the main branch triggers a new deployment.

## 📝 License

All rights reserved © 2026 Kabir Technologies

## 📧 Contact

ra.eesa@kabirtechnologies.co.uk

---

Built with ❤️ by Kabir Technologies