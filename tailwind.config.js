/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
    theme: {
      extend: {
        colors: {
            mainColor: '#00B493',          
            mainBlack: '#17171B',
            mainRed: '#C11100',
            subGrey: '#F5F5F5',
            subGrey2: '#A8A8A8',
            subGrey3: '#26262D',
        },
        fontFamily: {
          pretendardBlack: ['Pretendard Black', 'sans-serif'],
          pretendardBold: ['Pretendard Bold', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }