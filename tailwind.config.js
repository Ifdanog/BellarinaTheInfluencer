/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        beige: "#d8b08c",
        brown: "#4e342e",
        cream: "#f8f4ee",
        dark: "#111111",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],           // Body + General text
        display: ['Satoshi', 'Inter', 'sans-serif'],          // Headings (Modern SaaS feel)
        heading: ['Space Grotesk', 'Satoshi', 'sans-serif'],  // Big titles
      }
    },
  },
  plugins: [],
}