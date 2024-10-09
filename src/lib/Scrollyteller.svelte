<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import type { PanelDefinition, Style } from './types.js';
	import { ScrollPositions } from './types.js';
	import { createEventDispatcher } from 'svelte';
	import { getScrollingPos, getScrollSpeed } from './Scrollyteller/Scrollyteller.util';
	import OnProgressHandler from './Scrollyteller/OnProgressHandler.svelte';
	import DeprecationNotice from './Scrollyteller/DeprecationNotice.svelte';
	import PanelObserver from './Scrollyteller/PanelObserver.svelte';
	import ScreenDimsStoreUpdater from './Scrollyteller/ScreenDimsStoreUpdater.svelte';
	import { maxGraphicWidth, maxScrollytellerWidth, ratio as ratioStore } from './stores';
	import Panels from './Panels.svelte';
	import Viz from './Viz.svelte';
	const dispatch = createEventDispatcher();

	export let customPanel: ComponentType | null = null;
	export let panels: PanelDefinition[];
	/** Whether to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default. */
	export let onProgress: boolean = false;
	/** @deprecated please use on:marker instead */
	export let onMarker: () => void = null;
	export let observerOptions: IntersectionObserverInit = undefined;
	/**
	 * When `true` we remove the slot from the DOM when not in the viewport, and
	 * debounce loading markers while the browser is scrolling quickly.
	 *
	 * This is useful to free up layers/memory/CPU in complex interactives,
	 * especially to prevent out of memory crashe issues with iPhone Safari.
	 *
	 * The trade-off is you may need to use `<link rel="preload"` for resources
	 * that don't appear in the page by default.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload mdn preload docs}
	 */
	export let discardSlot = false;

	export let layout: Style = {};
	$: _layout = {
		align: layout.align || 'centre',
		resizeInteractive: layout.resizeInteractive ?? true,
		transparentFloat: layout.transparentFloat ?? ['left', 'right'].includes(layout.align)
	};

	export let ratio: number = 1;
	$: $ratioStore = ratio;

	/**
	 * Percent past the bottom of the viz the graphic has to be before it triggers. Default 20 (20%)
	 */
	export let vizMarkerThreshold = 20;

	$: if (vizMarkerThreshold >= 50) {
		throw new Error('vizMarkerThreshold must be <50% screen height');
	}

	/**
	 * When the user is scrolling at a speed greater than this, don't mount
	 * new components or update markers.
	 */
	$: maxScrollSpeed = discardSlot ? 0.5 : Infinity;

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scrollytellerRef: HTMLElement | undefined;
	let marker: any;
	let scrollingPos: ScrollPositions;
	let isInViewport = false;
	let scrollSpeed = 0;
	let deferUntilScrollSettlesActions = [];

	const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) =>
		deferUntilScrollSettles(() => {
			isInViewport = scrollytellerEntry.isIntersecting;
		})
	);

	const deferUntilScrollSettles = (fn) => {
		if (scrollSpeed < maxScrollSpeed) {
			fn();
		} else {
			deferUntilScrollSettlesActions = [...deferUntilScrollSettlesActions, fn];
		}
	};

	const runDeferredActions = () => {
		if (scrollSpeed < maxScrollSpeed) {
			if (deferUntilScrollSettlesActions.length) {
				deferUntilScrollSettlesActions.forEach((fn) => fn());
				deferUntilScrollSettlesActions = [];
			}
		}
	};

	onMount(() => {
		scrollingPos = getScrollingPos(scrollytellerRef);
		if (scrollingPos === ScrollPositions.ABOVE) marker = panels[0].data;
		if (scrollingPos === ScrollPositions.BELOW) marker = panels[panels.length - 1].data;

		if (discardSlot) {
			scrollytellerObserver.observe(scrollytellerRef);
		}

		getScrollSpeed((newSpeed) => {
			scrollSpeed = newSpeed;
			runDeferredActions();
		});
	});

	$: marker && deferUntilScrollSettles(() => dispatch('marker', marker));

	// Debug mode should highlight blocks, graphic & show which breakpoint we're at
	$: isDebug = typeof location !== 'undefined' && location.hash === '#debug=true';
</script>

{#if onProgress}
	<OnProgressHandler {scrollytellerRef} on:progress />
{/if}

<DeprecationNotice {onProgress} {onMarker} />
<ScreenDimsStoreUpdater align={_layout.align} />
<PanelObserver bind:marker {observerOptions} {isDebug} {vizMarkerThreshold} />

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

<div class="scrollyteller-wrapper">
	{#if !_layout.resizeInteractive}
		<Viz layout={_layout} {isInViewport} {discardSlot} on:load><slot /></Viz>
	{/if}
	<div
		class="scrollyteller"
		class:scrollyteller--resized={_layout.resizeInteractive}
		class:scrollyteller--debug={isDebug}
		class:scrollyteller--columns={['left', 'right'].includes(_layout.align)}
		style:--maxScrollytellerWidthPx={$maxScrollytellerWidth + 'px'}
		style:--rightColumnWidth={`min(calc(var(--maxScrollytellerWidth) * var(--vizMaxWidth)), ${$maxGraphicWidth}px)`}
		bind:this={scrollytellerRef}
	>
		{#if _layout.resizeInteractive}
			<Viz layout={_layout} {isInViewport} {discardSlot} on:load><slot /></Viz>
		{/if}
		<Panels layout={_layout} {panels} {customPanel} />
	</div>
</div>

<style lang="scss">
	@import './breakpoints.scss';
	.scrollyteller-wrapper {
		position: relative;
	}
	.scrollyteller {
		position: relative;
		--maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);
		--marginOuter: 1rem;
		margin: 0 auto;
		max-width: calc(var(--maxScrollytellerWidth) - calc(var(--marginOuter) * 2));

		--vizMaxWidth: 1;
		--vizMarginOuter: 1.5rem;

		@media (min-width: $breakpointTablet) {
			--marginOuter: 2rem;
			--vizMarginOuter: 3rem;
		}
		@media (min-width: $breakpointLargeTablet) {
			--marginOuter: 2rem;
			--vizMarginOuter: 3rem;
			--vizMaxWidth: 0.55;

			// When in column mode, use fit-content to collapse whitespace
			// between text & viz
			&--columns {
				width: fit-content;
			}
		}
		@media (min-width: $breakpointDesktop) {
			--marginOuter: 3rem;
			--vizMarginOuter: 4rem;
			--vizMaxWidth: 0.6;
		}
		@media (min-width: $breakpointLargeDesktop) {
			--marginOuter: 4rem;
			--vizMarginOuter: 6rem;
		}

		&--debug:after {
			content: 'Mobile';
			position: fixed;
			right: 0.5rem;
			top: 0.5rem;
			padding: 0.5rem 1rem;
			background: white;
			color: black;
			border: 5px solid limegreen;
			border-radius: 1rem;
			z-index: 110;
			@media (min-width: $breakpointTablet) {
				content: 'Tablet';
			}
			@media (min-width: $breakpointLargeTablet) {
				content: 'LargeTablet';
			}
			@media (min-width: $breakpointDesktop) {
				content: 'Desktop';
			}
			@media (min-width: $breakpointLargeDesktop) {
				content: 'LargeDesktop';
			}
		}
	}
</style>
