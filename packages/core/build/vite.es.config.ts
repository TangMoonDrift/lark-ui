import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'node:fs'
import { filter, includes, map } from 'lodash-es'

const getDirectoriesSync = (basePath: string) => {
	const entries = readdirSync(basePath, { withFileTypes: true })
	return map(
		filter(entries, entry => entry.isDirectory()),
		entry => entry.name
	)
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: '../../tsconfig.build.json',
			outDir: 'dist/types'
		})
	],
	build: {
		outDir: 'dist/es',
		minify: false,
		cssCodeSplit: true,
		lib: {
			entry: resolve(__dirname, '../index.ts'),
			name: 'LarkUI',
			fileName: 'index',
			formats: ['es']
		},
		rollupOptions: {
			external: [
				'vue',
				'@fortawesome/fontawesome-svg-core',
				'@fortawesome/free-solid-svg-icons',
				'@fortawesome/vue-fontawesome',
				'@popperjs/core',
				'async-validator'
			],
			output: {
				assetFileNames(chunkInfo) {
					if (chunkInfo.name === 'style.css') {
						return 'index.css'
					}
					return chunkInfo.name as string
				},
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor'
					}
					if (id.includes('packages/hooks')) {
						return 'hooks'
					}
					if (id.includes('packages/utils')) {
						return 'utils'
					}

					for (const item of getDirectoriesSync('../components')) {
						if (includes(id, `/packages/components/${item}`))
							return item
					}
				}
			}
		}
	}
})
