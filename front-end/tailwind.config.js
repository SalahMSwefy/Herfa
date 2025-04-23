/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                brand: 'Bruno Ace SC, sans-serif',
            },
            colors: {
                main: {
                    50: '#fffcea',
                    100: '#fff5c5',
                    200: '#ffeb85',
                    300: '#ffda46',
                    400: '#ffc71b',
                    500: '#ffa500',
                    600: '#e27c00',
                    700: '#bb5502',
                    800: '#984208',
                    900: '#7c360b',
                    950: '#481a00',
                    transparent: '#fffceab3',
                },
            },
            animation: {
                'focus-in-expand': 'focus-in-expand 3s ease-out infinite both',
                pop: 'pop 0.5s ease-out',
            },
            keyframes: {
                'focus-in-expand': {
                    '0%': {
                        letterSpacing: '-0.5em',
                        filter: 'blur(12px)',
                        opacity: '0',
                    },
                    '100%': {
                        filter: 'blur(0)',
                        opacity: '1',
                    },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'slide-in-top': {
                    '0%': { transform: 'translateY(-70px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-70px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%, 100%': {
                        textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                    },
                    '50%': { textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' },
                },
                pop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
