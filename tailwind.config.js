/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          darkest: '#080504',
          dark: '#120d0a',
          roast: '#1c1410',
          bean: '#2b1e17',
          mocha: '#3d2b20',
          caramel: '#d9822b',
          amber: '#f59e0b',
          gold: '#dfa863',
          cream: '#f4efe8',
          milk: '#fdfbf7',
          matcha: '#20392c',
          matchaLight: '#39604b',
          matchaGlow: '#85a98f',
          berry: '#3b1824',
          berryLight: '#612539',
          terracotta: '#c85a32',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', '"Outfit"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'steam-slow': 'steam 6s infinite ease-out',
        'float-slow': 'float 7s infinite ease-in-out',
        'float-reverse': 'floatRev 8s infinite ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'translateY(-30px) scale(1.4) rotate(8deg)', opacity: '0.7' },
          '100%': { transform: 'translateY(-70px) scale(2) rotate(-6deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}


