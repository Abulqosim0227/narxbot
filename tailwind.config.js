/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3fb',
          100: '#b3daf2',
          200: '#80c1e9',
          300: '#4da8e0',
          400: '#1a8fd7',
          500: '#0089c4',
          600: '#007ac7',
          700: '#006bb0',
          800: '#005c99',
          900: '#004d82',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'bottom-nav': '0 -1px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}
