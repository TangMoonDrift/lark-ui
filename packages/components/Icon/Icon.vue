<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es';

defineOptions({
	name: 'LarkIcon',
	inheritAttrs: false,
})

const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyle = computed(() => ({ color: props.color ?? void 0 }))
</script>

<template>
	<i class="lark-icon" :class="[`lark-icon-${type}`]" v-bind="$attrs" :style="customStyle">
		<font-awesome-icon v-bind="filterProps" />
	</i>
</template>

<style scoped>
@import './style.css';
</style>