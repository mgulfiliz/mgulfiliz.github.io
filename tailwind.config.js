/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#271519", // Terminal background
          text: "#72b5a6", // Main text color
          prompt: {
            user: "#7281b5", // 'guest' text
            at: "#b58572", // '@' symbol
            host: "#81b572", // 'portfolio' text
            colon: "#b58572", // ':' symbol
            path: "#b58572", // '~' path
            symbol: "#b58572", // '$' symbol
          },
          glow: {
            base: "#e4ccd1", // Base color for glowing text
            DEFAULT: "#e4ccd1", // Default glow color
          },
          scrollbar: {
            track: "#363636", // Scrollbar track
            thumb: "#4a4a4a", // Scrollbar thumb
            hover: "#555555", // Scrollbar hover
          },
          cursor: "#c0c0c0", // Blinking cursor color
        },
      },
      fontFamily: {
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};
