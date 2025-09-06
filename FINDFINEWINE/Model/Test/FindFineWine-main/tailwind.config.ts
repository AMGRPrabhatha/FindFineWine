import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: { 
        'footer-texture': "url('./assets/footerbg.png')",
        'heading-texture': "url('./assets/headingbg.png')",
      },
      fontFamily: {
        'basker': ['Baskerville', 'san-serif'],
        'basker-bold': ['Baskerville', 'san-serif'],
        'basker-italic': ['Baskerville-ital', 'san-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
