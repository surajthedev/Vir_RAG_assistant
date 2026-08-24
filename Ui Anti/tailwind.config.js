/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          "blue-dark": "#1D4ED8",
          "blue-light": "#EFF6FF",
          "blue-50": "#F0F7FF",
          yellow: "#F59E0B",
          "yellow-dark": "#D97706",
          "yellow-light": "#FFFBEB",
          red: "#EF4444",
          "red-dark": "#DC2626",
          "red-light": "#FEF2F2",
          slate: "#0F172A",
          "slate-light": "#F8FAFC",
          "slate-muted": "#64748B",
          green: "#10B981",
          "green-light": "#ECFDF5",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03)',
        'elevated': '0 20px 40px -8px rgba(37, 99, 235, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.04)',
        'glow-blue': '0 0 25px rgba(37, 99, 235, 0.25)',
        'glow-yellow': '0 0 25px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'float': 'float 3.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'soundwave-1': 'soundwave 1s ease-in-out infinite alternate',
        'soundwave-2': 'soundwave 0.8s ease-in-out 0.2s infinite alternate',
        'soundwave-3': 'soundwave 1.2s ease-in-out 0.4s infinite alternate',
        'soundwave-4': 'soundwave 0.9s ease-in-out 0.1s infinite alternate',
        'soundwave-5': 'soundwave 1.1s ease-in-out 0.3s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        soundwave: {
          '0%': { height: '4px' },
          '100%': { height: '24px' },
        }
      }
    },
  },
  plugins: [],
}
