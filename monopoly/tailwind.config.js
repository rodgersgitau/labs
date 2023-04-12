/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#170f1d",
        },
        secondary: {
          DEFAULT: "#29203F",
        },
        accent: {
          DEFAULT: "#EEB3CB",
        },
      },
      backgroundImage: {
        "hero-pattern": "url('/images/backdrop.png')",
      },
      boxShadow: {
        stamp: "5px 0px 5px 2px currentColor",
        slick: "0px 5px 10px currentColor",
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
          accent: "#EEB3CB",
          "base-100": "whitesmoke",

          "--btn-text-case": "capitalize",
        },
      },
      "lofi",
    ],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
