import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#273238',
        secondary: '#FF7043'
      }
    },
  },
  plugins: [],
} satisfies Config

