/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f5f8ff',
          100: '#ebf1ff',
          200: '#d6e4ff',
          300: '#b0cbff',
          350: '#8ab4ff',
          400: '#7fa5ff',
          450: '#6291ff',
          500: '#4d7cff',
          600: '#2552eb',
          650: '#2147d0',
          700: '#1d3ec7',
          750: '#1a39b8',
          800: '#1c34a1',
          850: '#1a2d8a',
          900: '#1d3080',
          950: '#111b4d',
        },
        gray: {
          50: '#f9fafb',
          55: '#f7f8f9',
          100: '#f3f4f6',
          150: '#eaecf0',
          200: '#e5e7eb',
          250: '#d8dbe1',
          300: '#d1d5db',
          350: '#bbc0cb',
          400: '#9ca3af',
          405: '#96a0af',
          450: '#6b7280',
          500: '#6b7280',
          550: '#5c6370',
          600: '#4b5563',
          650: '#3f4956',
          700: '#374151',
          750: '#2f3844',
          800: '#1f2937',
          850: '#1a222e',
          900: '#111827',
          950: '#030712',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top-2': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'zoom-in-95': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'in': 'fade-in 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-from-top-2': 'slide-in-from-top-2 0.2s ease-out',
        'zoom-in-95': 'zoom-in-95 0.15s ease-out',
      },
    },
  },
  plugins: [],
}
