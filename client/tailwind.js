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
