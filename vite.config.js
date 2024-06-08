import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	assetsInclude: ['**/*.jpg'],
	server: {
		proxy: {
			'/test': {
				target: 'http://43.203.8.51:8080',
				changeOrigin: true,
			},
			'/member': {
				target: 'http://211.46.77.6:8080',
				changeOrigin: true,
			},
			'/board': {
				target: 'http://211.46.77.6:8080',
				changeOrigin: true,
			},
			'/api': {
				target: 'http://211.46.77.6:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	define: {
		global: 'window',
	},
})
