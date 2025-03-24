<script setup lang="ts">
</script>

<template>
	<lark-button round type="danger" size="large">I ❤️ Rust!</lark-button>
	<lark-button round type="primary" size="large">I ❤️ Rust!</lark-button>
	<lark-button round type="warning" size="large">I ❤️ Rust!</lark-button>
	<lark-button round type="info" size="large">I ❤️ Rust!</lark-button>

	<main class="lark-main">
		<lark-tooltip placement="top">
			<template #content> multiple lines<br />second line </template>
			
			<lark-button round type="primary" size="large">Hoy es sabado!!!</lark-button>
		</lark-tooltip>
	</main>
</template>

<style scoped>
.lark-main {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
}
</style>
