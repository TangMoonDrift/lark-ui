<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { throttle } from 'lodash-es'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import LarkIcon from '../Icon/Icon.vue'
import './style.css'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({
	name: 'LarkButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
	tag: 'button',
	nativeType: 'button',
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
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => ctx?.size ?? props.size ?? 'default')
const type = computed(() => ctx?.type ?? props.type ?? 'primary')
const disabled = computed(() => ctx?.disabled || props?.disabled || false)
const handleBtnClick = (event: MouseEvent) => {
	emits('click', event)
}

const throttleClick = throttle(handleBtnClick, props.throttleDuration, {
	leading: true,
	trailing: false
})

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
