import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin

export function makeInstaller(components: Plugin[]) {
	const installer = (app: App) =>
		each(components, component => app.use(component))
	return installer as Plugin
}

export const withInstall = <T>(conponent: T) => {
	;(conponent as SFCWithInstall<T>).install = (app: App) => {
		const { name } = conponent as unknown as { name: string }
		if (name) {
			app.component(name, conponent as Plugin)
		}
	}
	return conponent as SFCWithInstall<T>
}
