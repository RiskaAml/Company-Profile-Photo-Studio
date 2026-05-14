/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      colors: {
        mint:    { DEFAULT: '#00E5CC', dark: '#00B3A0', light: '#E0FBF8' },
        purple:  { DEFAULT: '#A855F7', dark: '#7C3AED', light: '#F3E8FF' },
        pink:    '#EC4899',
        yellow:  '#FACC15',
        // dark mode surfaces
        d0: '#0A0A0F',   // darkest bg
        d1: '#111118',   // card bg
        d2: '#1A1A24',   // elevated
        d3: '#252532',   // border
        // light mode surfaces
        l0: '#FAFAFA',
        l1: '#FFFFFF',
        l2: '#F4F4F6',
        l3: '#E4E4E8',
      },
      animation: {
        'glow':        'glow 3s ease-in-out infinite',
        'slide-up':    'slideUp 0.5s ease forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        glow:    { '0%,100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
      }
    }
  },
  plugins: []
}
