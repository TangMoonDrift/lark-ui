import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface IconProps {
	border?: boolean
	fixedWidth?: boolean
	flip?: 'horizontal' | 'vertical' | 'both'
	icon: object | Array<string> | string | IconDefinition
	mask?: object | Array<string> | string
	listItem?: boolean
	pull?: 'left' | 'right'
	pulse?: boolean
	rotation?: 90 | 180 | 270 | '90' | '180' | '270'
	swapOpcity?: boolean
	spin?: boolean
	spinPulse?: boolean
	spinReverse?: boolean
	size?:
		| '2xs'
		| 'xs'
		| 'sm'
		| 'lg'
		| '1x'
		| '2x'
		| '3x'
		| '4x'
		| '5x'
		| '6x'
		| '7x'
		| '8x'
		| '9x'
		| '10x'
	transform?: string | object
	symbol?: boolean | string
	title?: string
	inverse?: boolean
	bounce?: boolean
	shake?: boolean
	beat?: boolean
	fade?: boolean
	beatFade?: boolean
	type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
	color?: string
}
