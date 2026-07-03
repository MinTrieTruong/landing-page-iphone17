/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        apple: {
          black:   '#1d1d1f',
          gray:    '#6e6e73',
          silver:  '#f5f5f7',
          blue:    '#0071e3',
          'blue-hover': '#0077ED',
        },
        titan: {
          black:   '#1C1C1E',
          natural: '#A89F91',
          desert:  '#C4A882',
          white:   '#F5F0E8',
        },
      },
      backgroundImage: {
        'hero-dark': 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #111827 100%)',
        'hero-light': 'linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'fade-in':      'fadeIn 0.8s ease forwards',
        'slide-up':     'slideUp 0.8s ease forwards',
        'slide-left':   'slideLeft 0.8s ease forwards',
        'scale-in':     'scaleIn 0.6s ease forwards',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'badge-pop':    'badgePop 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':       { transform: 'translateY(-20px) rotate(1deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(60px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,113,227,0.3)' },
          '50%':      { boxShadow: '0 0 60px rgba(0,113,227,0.8)' },
        },
        badgePop: {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
