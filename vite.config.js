import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
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
			},
		},
		define: {
			global: 'window',
		},
	})
}
