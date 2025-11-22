/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kt-black': '#0a0a0b',
        'kt-black-lighter': '#1a1a1b',
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
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}