/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b2942',
          dark: '#6b1f33',
          light: '#a83a56',
        },
        accent: {
          DEFAULT: '#c9a227',
          light: '#e8c547',
        },
        surface: '#ffffff',
        cream: '#faf8f5',
        ink: '#2c2420',
        muted: '#6b5e58',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
