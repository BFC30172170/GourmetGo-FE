/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fire: {
          '0%, 100%': { transform: 'rotate(-3deg)',opacity:'70%' },
          '50%': { transform: 'rotate(3deg)',opacity:'100%' },
        }
      },
      animation: {
        fire: 'fire 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}