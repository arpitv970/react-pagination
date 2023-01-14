/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: '#1497e3',
                secondary: '#2017d1',
            },
        },
    },
    variants: {
        extends: {},
    },
    plugins: [],
};