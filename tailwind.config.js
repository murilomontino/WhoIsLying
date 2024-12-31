/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./source/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                bangers: ['Bangers_400Regular', 'sans-serif'], // Adicione a fonte desejada
                poppins: ['Poppins_400Regular', 'sans-serif'], // Adicione a fonte desejada
            },
            textShadow: {
                outlined: '2px 2px 2px #000',
                'outlined-white': '2px 2px 2px #fff',
                'outlined-red': '2px 2px 2px #ef4444',
            },
        },
    },
    plugins: [require('tailwindcss-textshadow')],
}
