/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f1',
          100: '#fff1e2',
          200: '#ffdcb9',
          300: '#ffc790',
          400: '#ffad5e',
          500: '#FF6B35', // primary
          600: '#e85a18',
          700: '#cc4308',
          800: '#a63a0c',
          900: '#7a2c0c',
        },
        secondary: {
          50: '#eafcf9',
          100: '#d0f7f3',
          200: '#a5ede5',
          300: '#6ce0d2',
          400: '#2EC4B6', // secondary
          500: '#1aab9e',
          600: '#0e8d82',
          700: '#0f726a',
          800: '#115b55',
          900: '#124a45',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#ededed',
          200: '#dfdfdf',
          300: '#c7c7c7',
          400: '#adadad',
          500: '#999999',
          600: '#6e6e6e',
          700: '#5a5a5a',
          800: '#333333',
          900: '#171717',
        },
        warning: '#FFC145',
        success: '#70E000',
        danger: '#FF4438',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'float': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};