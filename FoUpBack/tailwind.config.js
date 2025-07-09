module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#0690CF",
        secondary: "#026b9b",
        dark: "#171717",
      },
    },
  },
  plugins: [],
}