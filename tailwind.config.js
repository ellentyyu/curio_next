module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'mrs-sheppards': ['var(--font-mrs-sheppards)', 'cursive'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        dark: 'var(--color-dark)',
        accent: 'var(--color-accent)',
        bluegreen: 'var(--color-bluegreen)',
        bg: 'var(--color-bg)',
      },
    },
  },
}
