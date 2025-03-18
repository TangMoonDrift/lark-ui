<script lang="ts" setup>
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types'
import { watch, provide, ref, watchEffect } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'
import { debugWarn } from '@lark-ui/utils';

const COMP_NAME = 'LarkCollapse' as const
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)

defineOptions({
	name: COMP_NAME,
})

watchEffect(() => {
	if (props.accordion && activeNames.value.length > 1) {
		debugWarn(COMP_NAME, 'accordion mode only allows one active item at a time.')
	}
})

const updateActiveNames = (newNames: CollapseItemName[]) => {
	activeNames.value = newNames
	emit('update:modelValue', newNames)
	emit('change', newNames)
}

const handleItemClick = (name: CollapseItemName) => {
	const _ = props.accordion
		? [name]
		: activeNames.value.includes(name)
			? activeNames.value.filter(n => n !== name)
			: [...activeNames.value, name]
	updateActiveNames(_)
}

provide(COLLAPSE_CTX_KEY, {
	activeNames,
	handleItemClick,
})

watch(() => props.modelValue, (newNames) => {
	updateActiveNames(newNames)
})

</script>

<template>
	<div class="lark-collapse">
		<slot></slot>
	</div>
</template>

<style scoped>
@import "./style.css";
</style>