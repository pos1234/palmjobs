/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                gradientFirst: '#FE5E0A',
                gradientSecond: '#FE5E0A78',
                textR: '#0E121D',
                textW: '#FFFFFF',
                lightGrey: '#141414B2',
                lightGreen: '#E5ECEC',
                skillColor: '#FFA06E26',
                fadedText: '#C4C4C4',
                modalTitle: '#3B3B3B',
                forBack: '#ffa06e0d',
                darkBlue: '#141414B2',
                /*                 darkBlue: '#141414'
                 */
            },
            fontWeight: {
                frhW: '700',
                shW: '700',
                thW: '600',
                fhW: '500',
                dfrhW: '700',
                dshW: '700',
                dthW: '600',
                dfhW: '500',
                dfvW: '500',
                bigW: '400',
                midW: '300',
                midRW: '400',
                smW: '300',
                smRW: '400',
                adW: '400'
            },
            fontSize: {
                frhS: '2rem',
                shS: '1.5rem',
                thS: '1.375rem',
                fhS: '1.125rem',
                dfrhS: '3rem',
                dshS: '2.25rem',
                dthS: '2rem',
                dfhS: '1.5rem',
                dfvhS: '1.375rem',
                bigS: '1.25rem',
                midS: '1.125rem',
                midRS: '1.125rem',
                smS: '1rem',
                smRS: '1rem',
                addS: '0.875rem',
                numS: '0.75rem'
            },
            lineHeight: {
                frhL: '2.48rem',
                shL: '1.875rem',
                thL: '1.76rem',
                fhL: '1.4375rem',
                dfrhL: '3.84rem',
                dshL: '2.6875rem',
                dthL: '2.48rem',
                dfhL: '1.98rem',
                dfvL: '1.8125rem',
                bigL: '1.8rem',
                midL: '1.485rem',
                midRL: '1.485rem',
                smL: '1.48rem',
                smRL: '1.48rem',
                addL: '1.225rem'
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            },
            backgroundImage: {
                hero: "url('./images/Background.svg')"
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
};
