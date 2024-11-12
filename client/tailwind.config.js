// tailwind.config.js

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      'rex-green-light': '#B1D631', 
      'rex-green': '#D6FD51', 
      'dark-bg': '#000000', 
    },
    backgroundColor: {
      dark: {
        DEFAULT: '#000000',
        bg: '#000000'
      }
    },
    fontFamily: {
      'zen-dots': ['"Zen Dots"', 'sans-serif'],
      'kanit': ['"Kanit"', 'sans-serif'],
      'michroma': ['"Michroma"', 'sans-serif'],
    },
  },
};
export const plugins = [
  function ({ addComponents, theme }) {
    const newComponents = {
      '.scrollbar-custom': {
        position: 'relative',
        overflowY: 'auto', 
        scrollbarWidth: '5px',  
        '-ms-overflow-style': '10x', 

        '&::-webkit-scrollbar': {
          width: '5px', 
          height: '5px', 
        },

        '&:hover::-webkit-scrollbar': {
          width: '5px', 
          height: '5px',
        },

        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme('scrollbar.DEFAULT.thumb'),
          borderRadius: '9999px', 
        },

        '&::-webkit-scrollbar-track': {
          backgroundColor: theme('scrollbar.DEFAULT.track'),
        },

        /* Dark mode scrollbars */
        '.dark &::-webkit-scrollbar-thumb': {
          backgroundColor: theme('scrollbar.dark.thumb'),
        },

        '.dark &::-webkit-scrollbar-track': {
          backgroundColor: theme('scrollbar.dark.track'),
        },

        '.dark &:hover::-webkit-scrollbar': {
          width: '5px',
          height: '5px', 
        },
      },
    };

    addComponents(newComponents);
  },
];
