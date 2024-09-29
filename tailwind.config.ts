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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  safelist: [
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-red-500',
    'text-purple-500',
    'text-pink-500',
    'text-indigo-500',
  ],
  plugins: [],
};
export default config;
