const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  theme: {
    extend: {},
    container: {
      padding: '1rem',
      center: true
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      red: colors.red,
    }
  },
  variants: {},
  plugins: []
};
