import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	server: {
		proxy: {
			'/api-google': {
				target: 'https://script.google.com',
				changeOrigin: true,
				secure: false,
				followRedirects: true,
				rewrite: (path) => path.replace(/^\/api-google/, ''),
				headers: {
					Origin: 'https://script.google.com',
					Referer: 'https://script.google.com/',
				},
			},
		},
	},
})
