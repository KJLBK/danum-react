import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	assetsInclude: ['**/*.jpg'],
	server: {
		proxy: {
			'/api': {
				target: process.env.VITE_API_BASE_URL,
				ws: true,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	define: {
		global: 'window',
	},
})
/* eslint-disable no-console */
console.log(`  ➜  Address: ${process.env.VITE_API_BASE_URL}`)
