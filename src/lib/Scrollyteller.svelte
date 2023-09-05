<script lang="ts">
	import Panel from './Panel.svelte';
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';
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

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scrollytellerRef: HTMLElement | undefined;
	let steps: PanelRef[] = [];
	let marker: any;
	let scrollingPos: ScrollPositions;

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

	const IntersectionObserverCallback = (entries: IntersectionEntries[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				marker = entry.target.scrollyData;
			}
		});
	};
	const observer = new IntersectionObserver(IntersectionObserverCallback, observerOptions);

	onMount(() => {
		scrollingPos = getScrollingPos();
		if (scrollingPos === ScrollPositions.ABOVE) marker = panels[0].data;
		if (scrollingPos === ScrollPositions.BELOW) marker = panels[panels.length - 1].data;

		steps.forEach((step, i) => {
			observer.observe(step);
		});
	});

	const scrollHandler = () => {
		const rootRect = scrollytellerRef.getBoundingClientRect();

		onProgress({
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};

	$: marker && onMarker(marker);
</script>

<svelte:window on:scroll={onProgress ? scrollHandler : null} />

<svelte:head>
	{#if isOdyssey}
		<!-- styles required to make position sticky work -->
		<!-- existing styles on an Odyssey body are preventing position sticky from 'sticking' -->
		<!-- existing styles on an Odyssey body are preventing position sticky from 'sticking' -->
		<style>
			body {
				overflow: visible;
			}
		</style>
	{/if}
</svelte:head>

<div class="scrollyteller" bind:this={scrollytellerRef}>
	<div class="graphic">
		<slot />
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
	}
</style>
