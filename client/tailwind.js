const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  theme: {
    extend: {
      fontSize: {
        button: [
          "0.875rem",
          {
            letterSpacing: "1.25px",
          },
        ],
        body1: [
          "1rem",
          {
            letterSpacing: "0.5px",
          },
        ],
        body2: [
          "0.875rem",
          {
            letterSpacing: "0.25px",
          },
        ],
        caption: [
          "0.75rem",
          {
            letterSpacing: "0.4px",
          },
        ],
        headline6: [
          "1.25rem",
          {
            letterSpacing: "0.15px",
          },
        ],
        headline5: [
          "1.5rem",
          {
            letterSpacing: "0",
          },
        ],
      },
    },
    container: {
      padding: "1rem",
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
    },
    fontFamily: {
      roboto: ["Roboto"],
    },
  },
  variants: {},
  plugins: [],
};
