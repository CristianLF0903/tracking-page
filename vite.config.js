import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
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
