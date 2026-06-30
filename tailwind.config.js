/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					light: '#F39325',
					DEFAULT: '#f68414',
					strong: '#EC6608',
					dark: '#D7760C',
				},
				secondary: {
					light: '#F4F2F2',
					DEFAULT: '#666564',
					dark: '#3E3E3C',
				},
			},
			fontFamily: {
				sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
