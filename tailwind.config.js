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
        contrast: {
          50: "#E5E6F5",
          100: "#CBCCEC",
          200: "#B9BCE5",
          300: "#A8ABDF",
          400: "#969AD8",
          500: "#8589D2",
          600: "#7C7FC3",
          700: "#696CA5",
          800: "#5F6296",
          900: "#4C4E78",
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
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0%)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        up: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(-12%) " },
          "100%": { transform: "translateY(0%)" },
        },
        collapse: {
          "0%": { transform: "translateY(0%)", opacity: "1" },
          "100%": { transform: "translateY(-10%)", opacity: "0" },
        },
        changeColor: {
          "0%": { color: "rgb(120 113 108)" },
          "10%": { color: " rgb(185 28 28)" },
          "20%": { color: "rgb(251 191 36);" },
          "30%": { color: "rgb(101 163 13)" },
          "40%": { color: " rgb(16 185 129)" },
          "50%": { color: "rgb(8 145 178)" },
          "60%": { color: "rgb(2 132 199)" },
          "70%": { color: "rgb(99 102 241)" },
          "80%": { color: "rgb(217 70 239)" },
          "90%": { color: "rgb(219 39 119)" },
          "100%": { color: "rgb(159 18 57)" },
        },
        slide: {
          "0%": { transform: "translateX(-25%)" },
          "50%": { transform: "translateX(25%)" },
          "100%": { transform: "translateX(-25%)" },
        },
        hover: {
          "0%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        loadingCircle: "circle .5s alternate infinite ease",
        loadingShadow: " shadow .5s alternate infinite ease;",
        slideIn: "slideIn .5s cubic-bezier(0, 0, 0.2, 1)",
        slideOut: "slideOut .5s cubic-bezier(0, 0, 0.2, 1)",
        up: "up .6s cubic-bezier(0, 0, 0.2, 1) infinite",
        collapse: "collapse .1s cubic-bezier(0, 0, 0.2, 1)",
        spinSlow: "spin 4s linear infinite",
        changeColor: "changeColor 4s cubic-bezier(0, 0, 0.2, 1) infinite",
        slide: "slide 6s ease-in-out infinite",
        btnHover: "hover .6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
