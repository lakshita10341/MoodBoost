// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 1s ease-out',
          'gradient-text': 'gradient-text 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'gradient-text': {
            '0%': { backgroundPosition: '200% center' },
            '50%': { backgroundPosition: '0% center' },
            '100%': { backgroundPosition: '200% center' },
          },
        },
        colors: {
          'gradient-start': '#ff7a18',
          'gradient-end': '#af002d',
        },
      },
    },
    plugins: [],
  };
  