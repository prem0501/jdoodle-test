<template>
	<div class="w-full h-screen editor" ref="editorRef"></div>
</template>
<script setup lang="ts">
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

const editorRef = ref();
onMounted(() => {
	let startState = EditorState.create({
		doc: 'Hello World',
		extensions: [keymap.of(defaultKeymap), EditorState.tabSize.of(2)],
	});
	const view = new EditorView({
		state: startState,
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
