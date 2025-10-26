/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "minmax(16rem, 13rem) 1fr",
        register: "minmax(200px, 348px) 1fr",
      },
      gridTemplateRows: {
        header: "minmax(88px, 100px ) 1fr",
      },
      colors: {
        input: "#F2F4F8",
        primary: "#EC0B43",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
