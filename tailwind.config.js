module.exports = {
    mode: process.env.NODE_ENV ? 'jit' : undefined,
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                serif: 'Fira Code, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
