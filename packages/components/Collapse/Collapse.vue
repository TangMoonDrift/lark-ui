<script lang="ts" setup>
import type { CollapseProps, CollapseEmits } from './types'
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()

defineOptions({
	name: 'LarkCollapse',
})

</script>

<template>
	<div class="lark-collapse"></div>
</template>