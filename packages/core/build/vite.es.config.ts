import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'node:fs'
import { defer, delay, filter, includes, map } from 'lodash-es'
import shell from 'shelljs'
import { hooks } from '@lark-ui/vite-plugins'
import terser from '@rollup/plugin-terser'

const RETRY_MOVE_STYLES_DELAY = 1000 as const
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
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
		}),
		terser({
			compress: {
				sequences: isProd,
				arguments: isProd,
				drop_console: isProd && ['log'],
				drop_debugger: isProd,
				passes: isProd ? 4 : 1,
				global_defs: {
					__PROD__: JSON.stringify(isProd),
					__DEV__: JSON.stringify(isDev),
					__TEST__: JSON.stringify(isTest)
				}
			},
			format: {
				semicolons: false,
				shorthand: isProd,
				braces: !isProd,
				beautify: !isProd,
				comments: !isProd
			},
			mangle: {
				toplevel: isProd,
				eval: isProd,
				keep_classnames: isDev,
				keep_fnames: isDev
			}
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
