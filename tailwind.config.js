/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        topic: {
          50: "#F6F5E6",
          100: "#EDEBCE",
          200: "#E4E1B5",
          300: "#DBD79D",
          400: "#D6D291",
          500: "#D2CE85",
          600: "#BDB977",
          700: "#A8A46A",
          800: "#7E7B4F",
          900: "#545235",
        },
      },
      keyframes: {
        circle: {
          "0%": {
            top: "80px",
            height: "5px",
            transform: "scale(1.7)",
          },
          "40%": { height: "20px", transform: "scale(1)" },
          "100%": { top: "0%" },
        },
        shadow: {
          "0%": { transform: "scaleX(1.5)" },
          "40%": { transform: "scaleX(1)", opacity: "0.7" },
          "100%": { transform: "scaleX(.2)", opacity: "0.4" },
        },
      },
      animation: {
        loadingCircle: "circle .5s alternate infinite ease",
        loadingShadow: " shadow .5s alternate infinite ease;",
      },
    },
  },
  plugins: [],
};
