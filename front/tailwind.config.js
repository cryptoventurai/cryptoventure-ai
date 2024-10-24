/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mg': '950px',   // Custom breakpoint for extra small devices
      },
      boxShadow: {
        'custom-inset': 'inset 0px 0px 10px 10px #cec8c8',
        'custom-inset-2': 'inset 0px 0px 10px 10px #474242',
      },
    },
  },
  plugins: [],
}

