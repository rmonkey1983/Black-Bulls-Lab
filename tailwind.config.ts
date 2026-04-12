import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#09090b',
          gold: '#eab308',
          gray: '#71717a'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'sans-serif'],
      },
      backgroundImage: {
        'circuit-pattern': "url('/bg-custom.webp')",
      }
    }
  },
  plugins: [],
};
export default config;
