import { each, isFunction } from 'lodash-es'
import shell from 'shelljs'

type Params = {
	rmFiles?: string[]
	beforeBuild?: () => void
	afterBuild?: () => void
}

export default function ({ rmFiles = [], beforeBuild, afterBuild }: Params) {
	return {
		name: 'hooks-plugin',
		async buildStart() {
			each(rmFiles, file => {
				shell.rm('-rf', file)
			})
			if (isFunction(beforeBuild)) {
				beforeBuild()
			}
		},
		async buildEnd(err?: Error) {
			!err && isFunction(afterBuild) && afterBuild()
		}
	}
}
