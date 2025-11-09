/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#1a1b2e',
        'purple-gradient-start': '#8b5cf6',
        'purple-gradient-end': '#ec4899',
        'purple-accent': '#a855f7',
        'purple-border': '#e9d5ff',
        'gray-medium': '#64748b',
        'gray-light': '#94a3b8',
        'pink-accent': '#f472b6',
        'rose-accent': '#fb7185',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Playfair Display', 'Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.7s ease-out',
        'pulse-gentle': 'pulseGentle 1.5s ease-in-out infinite',
        'sparkle-rotate': 'sparkleRotate 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-horizontal': 'scrollHorizontal 60s linear infinite',
        'scroll-horizontal-reverse': 'scrollHorizontalReverse 70s linear infinite',
        'card-slide-out': 'cardSlideOut 0.5s ease-in forwards',
        'card-slide-out-reverse': 'cardSlideOutReverse 0.5s ease-in forwards',
        'card-slide-in': 'cardSlideIn 0.5s ease-out forwards',
        'card-slide-in-reverse': 'cardSlideInReverse 0.5s ease-out forwards',
        'card-deal': 'cardDeal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        sparkleRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        scrollHorizontal: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        scrollHorizontalReverse: {
          '0%': { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' },
        },
        cardSlideOut: {
          '0%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'translateX(-40%) translateY(20px) rotate(-15deg) scale(0.95)', 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'translateX(-120%) translateY(100px) rotate(-30deg) scale(0.8)', 
            opacity: '0' 
          },
        },
        cardSlideOutReverse: {
          '0%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'translateX(40%) translateY(20px) rotate(15deg) scale(0.95)', 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'translateX(120%) translateY(100px) rotate(30deg) scale(0.8)', 
            opacity: '0' 
          },
        },
        cardSlideIn: {
          '0%': { 
            transform: 'translateX(100%) translateY(-50px) rotate(10deg) scale(0.9)', 
            opacity: '0' 
          },
          '60%': { 
            transform: 'translateX(5%) translateY(5px) rotate(-2deg) scale(1.02)', 
            opacity: '0.9' 
          },
          '100%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
        },
        cardSlideInReverse: {
          '0%': { 
            transform: 'translateX(-100%) translateY(-50px) rotate(-10deg) scale(0.9)', 
            opacity: '0' 
          },
          '60%': { 
            transform: 'translateX(-5%) translateY(5px) rotate(2deg) scale(1.02)', 
            opacity: '0.9' 
          },
          '100%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
        },
        cardDeal: {
          '0%': { 
            transform: 'translateY(-100px) rotate(-10deg) scale(0.8)', 
            opacity: '0' 
          },
          '60%': { 
            transform: 'translateY(10px) rotate(2deg) scale(1.02)', 
            opacity: '0.9' 
          },
          '100%': { 
            transform: 'translateY(0) rotate(0deg) scale(1)', 
            opacity: '1' 
          },
        },
      },
    },
  },
  plugins: [],
}

