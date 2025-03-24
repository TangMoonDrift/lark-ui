/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],
	define: {
		__PROD__: JSON.stringify(false),
		__DEV__: JSON.stringify(false),
		__TEST__: JSON.stringify(true)
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [resolve(__dirname, './vitest.setup.ts')]
	}
})
