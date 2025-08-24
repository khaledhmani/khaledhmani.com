/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./*.html', './script.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          200: '#BBF7D0', // light
          500: '#22C55E', // primary
          600: '#16A34A', // hover
        },
        accent: '#FF7A00',
        base: '#1F1F1F',
      },
      boxShadow: {
        focus: '0 0 0 2px rgba(34,197,94,.6)',
      },
      borderColor: {
        brandSubtle: 'rgba(34,197,94,.40)',
      },
      fontFamily: {
        system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}