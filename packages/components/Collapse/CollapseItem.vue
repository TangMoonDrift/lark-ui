<script lang="ts" setup>
import type { CollapseItemProps } from './types'
const props = defineProps<CollapseItemProps>()

defineOptions({
	name: 'LarkCollapseItem',
})

</script>

<template>
	<div class="lark-collapse-item"></div>
</template>