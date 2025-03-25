/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101928",
        gray: "#fff",
        textBlue: "#fff",
        // darkGray: '#0B161A',
        // green: '#219653',
        // red: '#FF4747',
        // fontBlack: '#222326',
        // fontGray: '#7A7B7D',
        // darkGreen: "#0B161A"
      },
    },
  },
  plugins: [],
};
