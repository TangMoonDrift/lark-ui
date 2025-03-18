import { isString } from 'lodash-es'

class LarkUIError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'LarkUIError'
	}
}

export function throwError(scope: string, msg: string) {
	throw new LarkUIError(`[${scope}] ${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
	if (process.env.NODE_ENV !== 'production') {
		const err = isString(scope)
			? new LarkUIError(`[${scope}] ${msg}`)
			: scope
		console.warn(err)
	}
}
