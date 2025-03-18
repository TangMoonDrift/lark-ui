<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AlertProps, AlertEmits, AlertInstance } from './types'
import { typeIconMap } from '@lark-ui/utils'

defineOptions({
	name: 'LarkAlert',
	inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertProps>(), {
	type: 'info',
	closable: true,
	effect: 'light'
})

const emit = defineEmits<AlertEmits>()

const slots = defineSlots()

const visible = ref(true)
const close = () => {
	visible.value = false
	emit('close')
}

const open = () => {
	visible.value = true
}

const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')

const withDescription = computed(() => props.description || slots.default)

defineExpose<AlertInstance>({
	close,
	open
})
</script>

<template>
	<transition name="lark-alert-fade">
		<div v-show="visible" class="lark-alert" role="alert" :class="{
			[`lark-alert__${type}`]: type,
			[`lark-alert__${effect}`]: effect,
			'text-center': center,
		}">
			<lark-icon v-if="showIcon" class="lark-alert__icon" :class="{ 'big-icon': withDescription }"
				:icon="iconName" />
			<div class="lark-alert__content">
				<span class="lark-alert__title" :class="{ 'with-desc': withDescription }"
					:style="{ display: center && !showIcon ? 'flow' : 'inline' }">
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="lark-alert__description">
					<slot>{{ description }}</slot>
				</p>
				<div class="lark-alert__close" v-if="closable">
					<lark-icon @click.stop="close" icon="xmark" />
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
@import "./style.css";
</style>