module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
          primary: '#F50F5F',
          secondary: { // We can provide multiple shades for a color we have added
            100: '#F5F6FB',
            200: '#CCD8E8'
          }
        }
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
