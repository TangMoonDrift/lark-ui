import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
	plugins: [vue()],
	build: {
		outDir: 'dist/umd',
		lib: {
			entry: resolve(__dirname, '../index.ts'),
			name: 'LarkUI',
			fileName: 'index',
			formats: ['umd']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				assetFileNames(chunkInfo) {
					if (chunkInfo.name === 'style.css') {
						return 'index.css'
					}
					return chunkInfo.name as string
				},
				exports: 'named',
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
})
