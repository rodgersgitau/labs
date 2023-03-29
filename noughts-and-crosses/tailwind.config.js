/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Didact Gothic", "Avenir Next", "sans-serif"],
        serif: ["Open Sans", "Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
