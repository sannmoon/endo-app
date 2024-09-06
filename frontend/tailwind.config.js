/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    sans: ["Helvetica", "Arial", "sans-serif"],
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".nav-link, .nav-links span": {
          "text-decoration": "none",
          margin: "0px 20px",
          color: "#3b83f6",
          "font-weight": "600",
          "font-size": "25px",
        },
        ".nav-link:hover": {
          "text-decoration": "underline",
        },
      });
    },
  ],
};
