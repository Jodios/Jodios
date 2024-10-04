/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/**/*.{templ,go}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
