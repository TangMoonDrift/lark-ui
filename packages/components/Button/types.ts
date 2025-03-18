import type { Component, ComputedRef, Ref } from 'vue'

export type ButtonType =
	| 'primary'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'text'

export type NativeType = 'button' | 'submit' | 'reset'

export type ButtonSize = 'large' | 'default' | 'small'

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
	loadingIcon?: string
	useThrottle?: boolean
	autofocus?: boolean
	throttleDuration?: number
}

export interface ButtonEmits {
	(e: 'click', value: MouseEvent): void
}

export interface ButtonInstance {
	ref: Ref<HTMLButtonElement | void>
	disabled: ComputedRef<boolean>
	size: ComputedRef<ButtonSize | ''>
	type: ComputedRef<ButtonType | ''>
}

export interface ButtonGroupProps {
	size?: ButtonSize
	type?: ButtonType
	disabled?: boolean
}

export interface ButtonGroupContext {
	size?: ButtonSize
	type?: ButtonType
	disabled?: boolean
}
