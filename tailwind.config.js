/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'DM Sans': ['DM Sans', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'Inter Tight': ['Inter Tight', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
        'Open Sans': ['Open Sans', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif'],
        'Bebas' : ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        'grayGround': '#39445a'
      },
      screens: {
        xxs: '435px',
        xs: '500px',
      },
    }
  },
  plugins: [],
};
