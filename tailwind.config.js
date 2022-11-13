/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#F9F9F9",
        "primary-green": "#809500",
        "active-btn-green": "#6C7A13",
        "btn-hover": "#E4E4E4",
        "dark-grey": "#353535",
        "text-field": "#E2E2E2",
      },
      padding: {
        17: "68px",
        25: "100px",
        84: "332px",
      },
      height: {
        dot: "5px",
        header: "305px",
        field: "50px",
      },
      width: {
        dot: "5px",
        field: "350px",
      },
      borderRadius: {
        img: "3px",
      },
    },
  },
  plugins: [],
};
