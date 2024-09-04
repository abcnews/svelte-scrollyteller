<svelte:options
	customElement={{
		tag: 'abcnews-scrollyteller',
		shadow: 'none'
	}}
	accessors={true}
/>

<script>
	/**
	 * @file
	 * A Web Component export of the Svelte Scrollyteller.
	 *
	 * You should only use this in non-Svelte projects, such as older React
	 * codebases that can't be updated.
	 */
	import Scrollyteller from './Scrollyteller.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let panels = [];
	export let graphicRootEl;
	export let layout;
	$: {
		if (graphicRootEl) {
			dispatch('load', graphicRootEl);
		}
	}
</script>

{#if panels.length}
	<Scrollyteller {panels} {layout} {...$$restProps} on:progress on:marker>
		<div bind:this={graphicRootEl} class="wc-root"></div>
	</Scrollyteller>
{/if}

<style>
	.wc-root {
		width: 100%;
		position: relative;
	}
</style>
