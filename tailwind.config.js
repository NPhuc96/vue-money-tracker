const colors = require("tailwindcss/colors");
module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: colors.blueGray,
      },
      inset: {
        15: "15%",
        30: "30%",
        35: "35%",
        45: "45%",
      },
      width: {
        15: "15%",
        30: "30%",
        35: "35%",
        45: "45%",
        55: "55%",
        85: "85%",
        90: "90%",
      },
    },
    screens: {
      sm: "320px",
      md: "540px",
      lg: "760px",
      xl: "980px",
    },
    fontSize: {
      xss: ".65rem",
      xxs: ".75rem",
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
      ringColor: ["hover", "active"],
      fill: ["hover", "focus"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
