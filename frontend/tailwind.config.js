/** @type {import('tailwindcss').Config} */

const blue = "#3b83f6";
const green = "#22c55e";
const brown = "#db7235";

module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    sans: ["Helvetica", "Arial", "sans-serif"],
    extend: {
      fontSize: {
        h1: "2em",
        h2: "1.5em",
      },
      colors: {
        "c-blue": blue,
        "c-green": green,
        "c-brown": brown,
      },
    },
  },
  plugins: [],
};
