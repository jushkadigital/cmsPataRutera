/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Source directory
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Next.js app directory (if used)
    // Add other paths if needed
  ],
  theme: {
    extend: {
      // Add custom theme extensions here later if needed
    },
  },
  plugins: [
    // Add plugins like typography or animate here later if needed
  ],
}

export default config 