<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types'

defineOptions({
	name: 'LarkButton'
})

withDefaults(defineProps<ButtonProps>(), {
	tag: 'button',
	type: 'primary',
	size: 'default',
	nativeType: 'button',
	disabled: false,
	loading: false,
	icon: '',
	round: false,
	circle: false,
	plain: false
})

const slots = defineSlots<{
	default: () => unknown
}>()

const ButtonRef = ref<HTMLButtonElement>()
</script>

<template>
	<component :is="tag" ref="ButtonRef" :type="tag === 'button' ? nativeType : void 0" :disabled="disabled"
		class="lark-button" :class="{
			[`lark-button--${type}`]: type,
			[`lark-button--${size}`]: size,
			'is-round': round,
			'is-circle': circle,
			'is-plain': plain,
			'is-loading': loading,
			'is-disabled': disabled,
		}" :size="size">
		<slot>{{ slots.default?.() }}</slot>
	</component>
</template>
