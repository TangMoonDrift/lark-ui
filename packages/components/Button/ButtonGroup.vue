<script setup lang="ts">
import type { ButtonGroupProps } from "./types";
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";

defineOptions({
	name: "LarkButtonGroup",
});
const props = defineProps<ButtonGroupProps>();

provide(
	BUTTON_GROUP_CTX_KEY,
	reactive({
		size: toRef(props, "size"),
		type: toRef(props, "type"),
		disabled: toRef(props, "disabled"),
	})
);
</script>

<template>
	<div class="lark-button-group">
		<slot></slot>
	</div>
</template>

<style>
@import "./style.css";
</style>