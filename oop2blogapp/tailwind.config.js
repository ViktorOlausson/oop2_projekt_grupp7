/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
      '8xl': '96rem',
      '9xl': '104rem'
    },},
  },
  plugins: [],
}