import type { Component } from 'vue'

export type ButtonType =
	| 'primary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'text'

export type NativeType = 'button' | 'submit' | 'reset'

export type ButtonSize = 'large' | 'default' | 'small' | 'mini'

export interface ButtonProps {
	tag?: string | Component
	type?: ButtonType
	size?: ButtonSize
	nativeType?: NativeType
	disabled?: boolean
	loading?: boolean
	icon?: string
	round?: boolean
	circle?: boolean
	plain?: boolean
}
