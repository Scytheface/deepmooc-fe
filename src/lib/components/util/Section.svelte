<script lang="ts">
	let style = '';
	export { style as class };
</script>

<div class="border-2 border-gray-200 rounded-xl bg-white w-full dark:border-yellow-300 {style}">
	<slot />
</div>

<style>
	.min-w-lg {
		min-width: 860px;
	}

	.black-bg {
		background: black !important;
	}
</style>
