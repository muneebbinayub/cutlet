/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#0f0617',
        secoudary:'#181020',
        myYellow:'#ffc506d3',
        myWhite:'#ffffffc7'
      }
    },
    screens: {
      sm: '330px',

      md: '580px',

      lg: '780px',
    },
  },
  plugins: [],
}

