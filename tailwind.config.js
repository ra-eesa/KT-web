/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kt-black': '#121214',
        'kt-black-lighter': '#1c1c1e',
        'kt-black-accent': '#0f0f10',
        'kt-beige-dark': '#1a1815',
        'kt-cream': '#FAF8F3',
        'kt-cream-dark': '#F5F1E8',
        'kt-navy': '#0b1120',
        'kt-forest': '#064E3B',
        'kt-gold-light': '#F5D689',
        'kt-gold': '#C1912F',
        'kt-grey-light': '#E5E7EB',
        'kt-grey': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}