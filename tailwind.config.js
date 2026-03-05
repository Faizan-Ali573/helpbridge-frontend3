/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        hb: {
          primary: '#2563eb',
          secondary: '#10b981',
          accent: '#f97316',
          muted: '#6b7280',
          bg: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};


