// tailwind.config.js
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};