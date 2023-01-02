/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: "#fff5f5",
              color: "#ff502c",
              fontSize: ".87rem",
              padding: ".065rem .4rem",
              "&::before": {
                content: "none !important",
              },
              "&::after": {
                content: "none !important",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
