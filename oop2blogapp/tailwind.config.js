/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        card: '0px 0px 20px 10px rgba(0, 0, 0, 0.25)'
      },
      maxWidth: {
      '8xl': '96rem',
      '9xl': '104rem'
    },},
  },
  plugins: [],
}