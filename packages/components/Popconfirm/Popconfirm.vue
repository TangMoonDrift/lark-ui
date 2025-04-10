<script setup lang="ts">
import { ref, computed } from 'vue';
import LarkButton from "../Button/Button.vue";
import LarkIcon from "../Icon/Icon.vue";
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
			<div class="lark-popconfirm" :style="style">
				<div class="lark-popconfirm__main">
					<lark-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
					{{ title }}
				</div>
				<div class="lark-popconfirm__action">
					<lark-button size="small" class="lark-popconfirm__cancel" :type="cancelButtonType" @click="cancel">
						{{ cancelButtonText || t("popconfirm.cancelButtonText") }}
					</lark-button>
					<lark-button size="small" class="lark-popconfirm__confirm" :type="confirmButtonType"
						@click="confirm">
						{{ confirmButtonText || t("popconfirm.confirmButtonText") }}
					</lark-button>
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