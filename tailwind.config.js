/** @type {import('tailwindcss').Config} */
const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green,
      },
      fontFamily: {
        monserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi"]),
    }),
  ],
};
