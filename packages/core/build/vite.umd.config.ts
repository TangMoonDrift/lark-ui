import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'
import { defer, delay } from 'lodash-es'
import shell from 'shelljs'
import terser from '@rollup/plugin-terser'
import type { PluginOption } from 'vite'
import { hooks } from '@lark-ui/vite-plugins'

const RETRY_MOVE_STYLES_DELAY = 1000 as const
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const moveStyles = () => {
	try {
		readFileSync('./dist/umd/index.css.gz')
		defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'))
	} catch (error) {
		console.log(error)
		delay(moveStyles, RETRY_MOVE_STYLES_DELAY)
	}
}

const getCompressionPlugin = () => {
	return compression({
		filter: /\.(cjs|css)$/i
	}) as PluginOption
}

export default defineConfig({
	plugins: [
		vue(),
		isProd ? getCompressionPlugin() : [],
		hooks({
			rmFiles: ['../dist/index.css', '../dist/umd'],
			afterBuild: isProd ? moveStyles : () => {}
		}),
		terser({
			compress: {
				drop_console: isProd && ['log'],
				drop_debugger: isProd,
				passes: isProd ? 3 : 1,
				global_defs: {
					__PROD__: JSON.stringify(isProd),
					__DEV__: JSON.stringify(isDev),
					__TEST__: JSON.stringify(isTest)
				}
			}
		})
	],
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
