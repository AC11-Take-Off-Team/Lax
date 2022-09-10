/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*',
  ],
  theme: {
    extend: {
      colors:{
        'momo': '#F596AA',
        'kohbai': '#E16B8C',
        'sakura': '#FEDFE1',
      },
    },
  },
  plugins: [],
}