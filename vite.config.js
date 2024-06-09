import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
<<<<<<< HEAD
export default defineConfig({
	base: './',
	plugins: [react()],
	assetsInclude: ['**/*.jpg'],
	server: {
		proxy: {
			'/api': {
				target: process.env.VITE_API_BASE_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
=======
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return defineConfig({
		base: './',
		plugins: [react()],
		assetsInclude: ['**/*.jpg'],
		server: {
			cors: true,
			proxy: {
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
					// ws: true, // WebSocket 프록시 활성화
				},
>>>>>>> cae1d65 (임시)
			},
		},
		define: {
			global: 'window',
		},
	})
}
