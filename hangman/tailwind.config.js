/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#170f1d",
        },
        secondary: {
          DEFAULT: "#29203F",
        },
      },
      fontFamily: {
        cursive: ["Comfortaa", "cursive"],
        serif: ["Fira Sans Condensed", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#170f1d",
          secondary: "#29203F",
          "base-100": "whitesmoke",

          "--btn-text-case": "capitalize",
        },
      },
      "lofi",
    ],
  },
  plugins: [require("daisyui")],
};
