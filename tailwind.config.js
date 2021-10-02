module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "roboto": ['Roboto Mono', 'monospace']
      },
      fontSize: {
        "10px": "10px",
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "40px": "40px",
      },
      padding: {
        "30px": "30px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
