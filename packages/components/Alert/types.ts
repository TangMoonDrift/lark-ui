export type AlertType = 'success' | 'info' | 'warning' | 'error' | 'danger'

export interface AlertProps {
	title?: string
	description?: string
	center?: boolean
	type?: AlertType
	closable?: boolean
	effect?: 'light' | 'dark'
	showIcon?: boolean
}

export interface AlertEmits {
	(e: 'close'): void
}

export interface AlertInstance {
	close: () => void
	open: () => void
}
