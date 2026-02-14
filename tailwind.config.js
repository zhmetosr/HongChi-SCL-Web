/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        'primary-hover': '#4080FF',
        'primary-light': '#E8F1FF',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        'card-hover': '0 4px 20px rgba(22, 93, 255, 0.08)',
      },
      screens: {
        'xs': '375px',
        'sm': '768px',
        'lg': '1200px',
      },
      fontFamily: {
        sans: ['Inter', '微软雅黑', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
