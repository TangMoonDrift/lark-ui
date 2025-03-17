import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { readdir, readdirSync } from 'node:fs'
import { defer, delay, filter, includes, map } from 'lodash-es'
import shell from 'shelljs'
import hooks from '../plugins/hooks'

const RETRY_MOVE_STYLES_DELAY = 1000 as const
const getDirectoriesSync = (basePath: string) => {
	const entries = readdirSync(basePath, { withFileTypes: true })
	return map(
		filter(entries, entry => entry.isDirectory()),
		entry => entry.name
	)
}

const moveStyles = () => {
	try {
		readdirSync('./dist/es/theme')
		defer(() => shell.mv('./dist/es/theme', './dist'))
	} catch (error) {
		console.log(error)
		delay(moveStyles, RETRY_MOVE_STYLES_DELAY)
	}
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: '../../tsconfig.build.json',
			outDir: 'dist/types'
		}),
		hooks({
			rmFiles: ['./dist/es', './dist/theme', './dist/types'],
			afterBuild: moveStyles
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
					if (
						chunkInfo.type === 'asset' &&
						/\.(css)$/i.test(chunkInfo.name as string)
					) {
						return 'theme/[name].[ext]'
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
					if (
						id.includes('packages/utils') ||
						includes(id, 'plugin-vue:export-helper')
					) {
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
