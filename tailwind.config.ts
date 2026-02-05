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
        // L'Oréal Brand Colors
        gold: {
          50: "#FBF8F0",
          100: "#F5EDD8",
          200: "#EBD9B0",
          300: "#DFC388",
          400: "#D4AD60",
          500: "#C6A665", // Primary Gold
          600: "#A88A4E",
          700: "#8A6E3D",
          800: "#6C532C",
          900: "#4E381B",
        },
        luxury: {
          black: "#1A1A1A",
          charcoal: "#2D2D2D",
          graphite: "#404040",
          silver: "#9A9A9A",
          pearl: "#F5F5F5",
          white: "#FAFAFA",
        },
        lavender: {
          50: "#F8F6FC",
          100: "#F0EBF8",
          200: "#E0D7F1",
          300: "#C9BBE6",
          400: "#B19FDB",
          500: "#9A83D0", // Scent/Therapy accent
          600: "#7D64B8",
          700: "#6249A0",
          800: "#483588",
          900: "#2E2170",
        },
        rose: {
          50: "#FDF2F4",
          100: "#FCE8EB",
          200: "#F9D0D7",
          300: "#F4A9B5",
          400: "#EC7589",
          500: "#E14D67",
          600: "#CD2F4C",
          700: "#AC243E",
          800: "#8F2138",
          900: "#791F35",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, #C6A665 0%, #EBD9B0 50%, #C6A665 100%)",
        "gradient-luxury":
          "linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)",
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        marble:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-down": "slideDown 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(198, 166, 101, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(198, 166, 101, 0.6)" },
        },
      },
      boxShadow: {
        luxury: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        gold: "0 10px 40px -10px rgba(198, 166, 101, 0.4)",
        "inner-gold": "inset 0 2px 4px 0 rgba(198, 166, 101, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
