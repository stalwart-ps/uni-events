/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable dark mode via a CSS class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: '#7c3aed', // purple
      darkbg: '#1f1f1f',
      darkcard: '#2a2a2a'
    },
  },
},

  plugins: [],
}

