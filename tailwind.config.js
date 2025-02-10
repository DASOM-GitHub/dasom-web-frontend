/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{ts,tsx}', 
    'components/**/*.{ts,tsx}'
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

            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",

            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))",
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))",
            },
        },
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          pretendardBlack: ['Pretendard Black', 'sans-serif'],
          pretendardBold: ['Pretendard Bold', 'sans-serif'],
          pretendardSemiBold: ['Pretendard SemiBold', 'sans-serif'],
          pretendardRegular: ['Pretendard Regular', 'sans-serif'],
        }
      },
    },
    plugins: [require("tailwindcss-animate")],
  }