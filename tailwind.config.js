
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#27AE60',
        secondary: '#EBD9B4',
        ternary: '#BFB29E'
      }
    },
  },
  plugins: [],
}

