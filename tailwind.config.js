/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sunrin-blue': 'var(--sunrin-blue)',
        'sunrin-green': 'var(--sunrin-green)',
        'sunrin-red': 'var(--sunrin-red)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)'],
      },
    },
  },
  plugins: [],
} 