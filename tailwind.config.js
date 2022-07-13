/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  //darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "ubuntuMono": ["Ubuntu Mono"],
      },
      transitionProperty: {
        width: 'width',
        height: 'height'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require('tailwind-scrollbar-hide'),
    require("tailwindcss-animate")
  ],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  }
}
