module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 3s ease-in 1"
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: 0.8 },
          "60%": { opacity: 0.8 },
          "100%": { opacity: 0 }
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
