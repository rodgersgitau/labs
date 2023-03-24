/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kelp: {
          DEFAULT: "#303A21",
          50: "#90AA69",
          100: "#86A25C",
          200: "#71884D",
          300: "#5B6E3F",
          400: "#465430",
          500: "#303A21",
          600: "#2B331D",
          700: "#252D1A",
          800: "#202616",
          900: "#1A2012",
        },
        sprout: {
          DEFAULT: "#C4D6A7",
          50: "#E3ECD6",
          100: "#E0E9D1",
          200: "#D9E5C6",
          300: "#D2E0BC",
          400: "#CBDBB1",
          500: "#C4D6A7",
          600: "#AAC481",
          700: "#91B25A",
          800: "#739144",
          900: "#556B32",
        },
      },
      fontFamily: {
        sans: ["Didact Gothic", "Avenir Next", "sans-serif"],
        serif: ["Open Sans", "Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
