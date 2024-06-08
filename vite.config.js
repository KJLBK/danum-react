import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IP 주소를 변수로 정의합니다.
const API_URL_1 = 'http://43.203.8.51:8080' // Danum(main)
// const API_URL_2 = 'http://118.32.97.217:8080' // 성준
// const API_URL_3 = 'http://125.141.52.238:8080' // 승민

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	assetsInclude: ['**/*.jpg'],
	server: {
		cors: true,
		proxy: {
			'/api': {
				target: API_URL_1,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				// ws: true, // WebSocket 프록시 활성화
			},
		},
	},
	define: {
		global: 'window',
	},
})
