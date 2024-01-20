<template>
	<div class="flex">
		<Sidebar />
		<ClientOnly>
			<Editor />
		</ClientOnly>
	</div>
</template>
<script setup lang="ts">
definePageMeta({
	auth: false,
});
</script>
