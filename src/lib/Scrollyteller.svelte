<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import type { IntersectionEntries, PanelDefinition, PanelRef } from './types.js';

	enum ScrollPositions {
		FULL = 'FULL',
		ABOVE = 'ABOVE',
		BELOW = 'BELOW'
	}

	export let customPanel: ComponentType | null = null;
	export let panels: PanelDefinition[];
	export let onProgress: ((progress: any) => void) | null = null;
	export let onMarker: (marker: any) => void;
	export let observerOptions: IntersectionObserverInit = {
		threshold: 0.5
	};
	/**
	 * When `true` we remove the slot from the DOM when not in the viewport.
	 * This is useful to free up layers/memory in complex interactives,
	 * especially to prevent out of memory crashes issues with iPhone Safari.
	 *
	 * The trade-off is you may need to use `<link rel="preload"` for resources.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload mdn preload docs}
	 */
	export let discardSlot = false;

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scrollytellerRef: HTMLElement | undefined;
	let steps: PanelRef[] = [];
	let marker: any;
	let scrollingPos: ScrollPositions;
	let isInViewport = false;

	const getScrollingPos = () => {
		const boundingRect = scrollytellerRef.getBoundingClientRect();
		if (boundingRect.bottom - window.innerHeight < 0) {
			return ScrollPositions.BELOW;
		}
		if (boundingRect.top > 0) {
			return ScrollPositions.ABOVE;
		}
		return ScrollPositions.FULL;
	};

	const panelIntersectionObserverCallback = (entries: IntersectionEntries[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				marker = entry.target.scrollyData;
			}
		});
	};
	const panelObserver = new IntersectionObserver(
		panelIntersectionObserverCallback,
		observerOptions
	);

	const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) => {
		isInViewport = scrollytellerEntry.isIntersecting;
	});

	onMount(() => {
		scrollingPos = getScrollingPos();
		if (scrollingPos === ScrollPositions.ABOVE) marker = panels[0].data;
		if (scrollingPos === ScrollPositions.BELOW) marker = panels[panels.length - 1].data;

		steps.forEach((step, i) => {
			panelObserver.observe(step);
		});

		if (discardSlot) {
			scrollytellerObserver.observe(scrollytellerRef);
		}
	});

	const scrollHandler = () => {
		const rootRect = scrollytellerRef.getBoundingClientRect();

		onProgress({
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};

	$: marker && onMarker && onMarker(marker);
</script>

<svelte:window on:scroll={onProgress ? scrollHandler : null} />

<svelte:head>
	{#if isOdyssey}
		<style>
			/* styles required to make position sticky work */
			/* existing styles on an Odyssey body are preventing position sticky from 'sticking' */
			body {
				overflow: visible;
			}
		</style>
	{/if}
</svelte:head>

<div class="scrollyteller" bind:this={scrollytellerRef}>
	<div class="graphic">
		{#if isInViewport || discardSlot === false}
			<slot />
		{/if}
	</div>
	<div class="content">
		{#each panels as panel, i}
			{@const panelClass =
				(panel.panelClass ?? '') +
				(i === 0 ? ' first' : '') +
				(i === panels.length - 1 ? ' last' : '')}
			{#if customPanel}
				<svelte:component this={customPanel} {...panel} {steps} {panelClass} />
			{:else}
				<Panel props={{ ...panel, steps, panelClass }} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.scrollyteller {
		position: relative;
	}
	.graphic {
		transform: translate3d(0, 0, 0);
		height: 100dvh;
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.content {
		margin-top: -100dvh;
		position: relative;
		z-index: 2;
		overflow: hidden;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}
</style>
