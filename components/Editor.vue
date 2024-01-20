<template>
	<div class="w-full h-screen editor" ref="editorRef"></div>
</template>
<script setup lang="ts">
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

const editorRef = ref();
onMounted(() => {
	new EditorView({
		doc: 'Hello World',
		extensions: [keymap.of(defaultKeymap)],
		parent: editorRef.value,
	});
});
</script>
<style lang="scss">
.editor {
	> div {
		height: 100%;
	}
}
</style>
