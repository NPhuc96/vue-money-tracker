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
        25: "25%",
        30: "30%",
        35: "35%",
        45: "45%",
      },
      width: {
        40: "40%",
        30: "35%",
      },
    },
    screens: {
      sm: "320px",
      md: "640px",
      lg: "960px",
      xl: "1180px",
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "active"],
      ringColor: ["hover", "active"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
