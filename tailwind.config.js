/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#171717',
                    600: '#181818;',
                },
            },
        },
    },
    plugins: [],
};
