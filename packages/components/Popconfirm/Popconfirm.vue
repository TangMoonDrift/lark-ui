<script setup lang="ts">
import { ref, computed } from 'vue';
import LarkTooltip from '../Tooltip/Tooltip.vue';
import { addUnit } from '@lark-ui/utils';
import { useLocale } from "../../hooks";
import type { TooltipInstance } from '../Tooltip'
import type { PopconfirmProps, PopconfirmEmits } from './types'

defineOptions({
	name: 'LakrPopconfirm',
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
	title: "",
	confirmButtonType: "primary",
	icon: "question-circle",
	iconColor: "#f90",
	hideAfter: 200,
	width: 150,
})
const emits = defineEmits<PopconfirmEmits>();

const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));
const { t } = useLocale();

const hidePopper = () => {
	tooltipRef.value?.hide();
}

const confirm = (e: MouseEvent) => {
	emits("confirm", e);
	hidePopper();
}

const cancel = (e: MouseEvent) => {
	emits("cancel", e);
	hidePopper();
}
</script>

<template>
	<lark-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
		<template #content>
			<div class="er-popconfirm" :style="style">
				<div class="er-popconfirm__main">
					<er-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
					{{ title }}
				</div>
				<div class="er-popconfirm__action">
					<er-button size="small" class="er-popconfirm__cancel" :type="cancelButtonType" @click="cancel">
						{{ cancelButtonText || t("popconfirm.cancelButtonText") }}
					</er-button>
					<er-button size="small" class="er-popconfirm__confirm" :type="confirmButtonType" @click="confirm">
						{{ confirmButtonText || t("popconfirm.confirmButtonText") }}
					</er-button>
				</div>
			</div>
		</template>

		<template v-if="$slots.default" #default>
			<slot name="default"></slot>
		</template>

		<template v-if="$slots.reference" #default>
			<slot name="reference"></slot>
		</template>
	</lark-tooltip>
</template>

<style scoped>
@import './style.css';
</style>