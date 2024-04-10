import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'dark-green': 'var(--dark-green)',
      'light-green': 'var(--light-green)',
      'dark-cream': 'var(--dark-cream)',
      'dark-gray': 'var(--dark-gray)',
      'light-gray': 'var(--light-gray)',
      'sky-blue': 'var(--sky-blue)',
      'mint-green': 'var(--mint-green)',
      blue: 'var(--blue)',
      white: 'var(--white)',
      green: 'var(--green)',
      softgreen: 'var(--softgreen)',
      gray: 'var(--gray)',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
