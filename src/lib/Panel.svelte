<script lang="ts">
	import { onMount } from 'svelte';
	import type { PanelRef, PanelDefinition } from './types';

	export let props: PanelDefinition;
	const { align, panelClass, data, nodes = [], steps = [] } = props;

	let panelRef: PanelRef;

	onMount(() => {
		panelRef.scrollyData = data;
		steps.push(panelRef);
	});
</script>

<div class={`st-panel ${align || ''} ${panelClass || ''}`} bind:this={panelRef}>
	<div class={`content`}>
		{#each nodes as node}
			{@html node.outerHTML}
		{/each}
	</div>
</div>

<style lang="scss">
	$pPadding: 0.875rem;
	$breakpoint: 61.25rem;

	.st-panel {
		min-height: calc(var(--vh, 1vh) * 100);
		display: flex;

		@media only screen and (min-width: 1023px) {
			&.left {
				width: 50%;
			}

			&.right {
				width: 50%;
				margin-left: 50%;
			}
		}
	}

	.content {
		background-color: var(--color-panel-background, rgba(0, 0, 0, 0.6));
		max-width: 66.666667%;
		margin: auto;
		border-radius: 2px;
		padding: $pPadding;

		:global(p) {
			font-family: ABCSerif, Book Antiqua, Palatino Linotype, Palatino, serif;
			font-size: 1.375rem;
			margin: 0;
			color: var(--color-panel-text, #fefefe);
			line-height: 1.666666667;

			+ :global(p) {
				margin-top: $pPadding;
			}
		}

		@media only screen and (max-width: $breakpoint) {
			max-width: 83.333333%;

			:global(p) {
				font-size: 1.125rem;
				line-height: 1.555555556;
			}
		}
	}
</style>
