<script setup lang="ts">
import { computed, ref } from 'vue'
import { throttle } from 'lodash-es'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import LarkIcon from '../Icon/Icon.vue'
import './style.css'

defineOptions({
	name: 'LarkButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
	tag: 'button',
	type: 'primary',
	size: 'default',
	nativeType: 'button',
	disabled: false,
	loading: false,
	icon: '',
	round: false,
	circle: false,
	plain: false,
	loadingIcon: '',
	useThrottle: false,
	autofocus: false,
	throttleDuration: 1000,
})

const emits = defineEmits<ButtonEmits>()
const slots = defineSlots<{
	default?: () => unknown
	loading?: () => unknown
}>()

const handleBtnClick = (event: MouseEvent) => {
	emits('click', event)
}

const throttleClick = throttle(handleBtnClick, props.throttleDuration)

const ButtonRef = ref<HTMLButtonElement>()
const iconStyle = computed(() => ({
	marginRight: slots.default ? '8px' : void 0
}))

defineExpose<ButtonInstance>({
	ref: ButtonRef
})
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
			'is-disabled': disabled
		}" :autofocus="autofocus" :size="size"
		@click="(e: MouseEvent) => { useThrottle ? throttleClick(e) : handleBtnClick(e) }">
		<template v-if="loading">
			<slot name="loading">
				<lark-icon class="loading-icon" :style="iconStyle" :icon="loadingIcon ?? 'spinner'" spin size="1x" />
			</slot>
		</template>
		<lark-icon v-if="icon && !loading" :style="iconStyle" :icon="icon" size="1x" />
		<slot>{{ slots.default?.() }}</slot>
	</component>
</template>
