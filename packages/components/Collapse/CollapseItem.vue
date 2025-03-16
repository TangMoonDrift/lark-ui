<script lang="ts" setup>
import type { CollapseItemProps } from './types'
import { inject, computed } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'

const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => ctx?.activeNames.value.includes(props.name))
const props = defineProps<CollapseItemProps>()

const handleClick = () => {
	if (props.disabled) return
	ctx?.handleItemClick(props.name)
}

defineOptions({
	name: 'LarkCollapseItem',
})
</script>

<template>
	<div class="lark-collapse-item" :class="{
		'is-disabled': disabled
	}">
		<div class="lark-collapse-item__header" :id="`lark-collapse-item-header-${name}`" :class="{
			'is-active': isActive,
			'is-disabled': disabled
		}" @click="handleClick">
			<span class="lark-collapse-item__title">
				<slot name="title">
					{{ title }}
				</slot>
			</span>
			<lark-icon icon="angle-right" class="header-angle" />
		</div>
		<div class="lark-collapse-item__wrapper" v-show="isActive">
			<div class="lark-collapse-item__content" :id="`item-content-${name}`">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "./style.css";
</style>