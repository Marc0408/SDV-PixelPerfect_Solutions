/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Andere Plugins
    function({ addUtilities }) {
      const newUtilities = {
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2d2d2d',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#555',
            borderRadius: '10px',
            border: '2px solid #2d2d2d',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#888',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};