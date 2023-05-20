/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121212",
        white: "#FFF",
        primary: "#B28BF4",
        secondary: "#62D6C5",
        red: "#C26C7B",
        gray: "#D0D5DD",
        darkGray: "#272727",
        lightGray: "#666666",
      },
      fontFamily: {
        sans: ["sans"],
        pretendard: ["Pretendard"],
      },
      rounded: {
        lg: "10px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
