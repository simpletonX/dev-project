/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui';

export default {
  content: ["./src/**/*.{html,js,vue,ts,jsx,tsx}"],
  plugins: [
    tailwindcssPrimeui
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
}
