/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dirkPurple: "#081A51",
        dirkBlue: "#0D2F81",
        lightWhite: "rgba(255,255,255,0.18)",
      },
    },
  },
  plugins: [],
};
