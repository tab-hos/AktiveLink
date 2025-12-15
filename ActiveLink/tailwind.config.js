/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx}",
    "./Pages/**/*.{js,jsx}",
    "./Components/**/*.{js,jsx}",
    "./Layout.jsx",
    "./App.jsx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0a0f2f',
          amber: '#f8cb2a',
        },
      },
    },
  },
  plugins: [],
}

