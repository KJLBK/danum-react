import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	assetsInclude: ['**/*.jpg'],
	server: {
		cors: true,
		proxy: {
			'/test': {
				target: 'http://43.203.8.51:8080',
				changeOrigin: true,
			},
			'/sungjun': {
				target: 'http://118.32.97.217:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/sungjun/, ''),
			},
			'/seungmin': {
				target: 'http://125.141.52.238:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/seungmin/, ''),
			},
			'/member': {
				target: 'http://43.203.8.51:8080',
				changeOrigin: true,
			},
			'/board': {
				target: 'http://43.203.8.51:8080',
				changeOrigin: true,
			},
			'/api': {
				target: 'http://43.203.8.51:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/ws-stomp': {
				target: 'http://43.203.8.51:8080/ws-stomp',
				changeOrigin: true,
				ws: true, // WebSocket 프록시 활성화
			},
			'/ws/chat': {
				target: 'http://43.203.8.51:8080/ws/chat',
				changeOrigin: true,
				ws: true, // WebSocket 프록시 활성화
			},
		},
	},
	define: {
		global: 'window',
	},
})
