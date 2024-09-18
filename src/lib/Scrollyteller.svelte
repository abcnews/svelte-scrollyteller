<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import type { IntersectionEntries, PanelDefinition, PanelRef } from './types.js';
	import { createEventDispatcher } from 'svelte';
	import {
		getScrollingPos,
		getScrollSpeed,
		ScrollPositions,
		type Style
	} from './Scrollyteller/Scrollyteller.util';
	import OnProgressHandler from './Scrollyteller/OnProgressHandler.svelte';
	import DeprecationNotice from './Scrollyteller/DeprecationNotice.svelte';
	import PanelObserver from './Scrollyteller/PanelObserver.svelte';

	const dispatch = createEventDispatcher();

	export let customPanel: ComponentType | null = null;
	export let panels: PanelDefinition[];
	/** Whether to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default. */
	export let onProgress: boolean = false;
	/** @deprecated please use on:marker instead */
	export let onMarker: () => void = null;
	export let observerOptions: IntersectionObserverInit;
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

	/**
	 * When the user is scrolling at a speed greater than this, don't mount
	 * new components or update markers.
	 */
	$: maxScrollSpeed = discardSlot ? 0.5 : Infinity;

	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	let scrollytellerRef: HTMLElement | undefined;
	let steps: PanelRef[] = [];
	let marker: any;
	let scrollingPos: ScrollPositions;
	let isInViewport = false;
	let scrollSpeed = 0;
	let deferUntilScrollSettlesActions = [];

	// emit an event with the graphic root, because the web component doesn't
	// support slots & must insert content  manually.
	let graphicRootEl;
	$: if (graphicRootEl) {
		dispatch('load', graphicRootEl);
	}

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

<PanelObserver
	bind:marker
	{steps}
	{observerOptions}
	{graphicRootEl}
	{isDebug}
	align={_layout.align}
/>

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

<div
	class="scrollyteller"
	class:scrollyteller--resized={_layout.resizeInteractive}
	class:scrollyteller--debug={isDebug}
	bind:this={scrollytellerRef}
>
	<div
		class="graphic"
		class:graphic--resized={_layout.resizeInteractive}
		class:graphic--right={_layout.resizeInteractive && _layout.align === 'left'}
		class:graphic--left={_layout.resizeInteractive && _layout.align === 'right'}
		class:graphic--centre={_layout.resizeInteractive && _layout.align === 'centre'}
		bind:this={graphicRootEl}
	>
		{#if isInViewport || discardSlot === false}
			<slot />
		{/if}
	</div>
	<div class="content" class:content--resized={!_layout.resizeInteractive}>
		{#each panels as panel, i}
			{@const panelClass =
				(panel.panelClass ?? '') +
				(i === 0 ? ' first' : '') +
				(i === panels.length - 1 ? ' last' : '')}
			{#if customPanel}
				<svelte:component this={customPanel} {...panel} {steps} {panelClass} />
			{:else}
				<Panel
					props={{
						...panel,
						align: panel.align || _layout.align,
						transparentFloat: _layout.transparentFloat,
						steps,
						panelClass
					}}
				/>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import './breakpoints.scss';
	.scrollyteller {
		position: relative;
		&--resized {
			max-width: 127.5rem;
			margin: 0 auto;
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
	.graphic {
		transform: translate3d(0, 0, 0);
		height: 100dvh;
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.graphic--resized {
		container-type: size;
		height: 60dvh;
		top: 10dvh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin: 0 auto;
		width: auto;
		--margin: 1.5rem;
		margin: 0 auto;
		width: calc(100% - calc(var(--margin) * 2));
		@media (min-width: $breakpointTablet) {
			--margin: 4rem;
			top: 8dvh;
			height: 62dvh;
		}

		&.graphic--left,
		&.graphic--right {
			@media (min-width: $breakpointLargeTablet) {
				align-items: center;
				--marginOuter: 2rem;
				--marginCentre: calc(var(--marginOuter) / 2);
				height: 84dvh;
				top: 8dvh;
				--maxWidth: 55%;
				max-width: calc(var(--maxWidth) - calc(var(--marginCentre) + var(--marginOuter)));
			}
			@media (min-width: $breakpointDesktop) {
				--marginOuter: 3rem;
				--maxWidth: 60%;
				height: 76dvh;
				top: 12dvh;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--marginOuter: 4rem;
				--maxWidth: 60%;
				top: 10dvh;
				height: 80dvh;
			}
		}
		&.graphic--left {
			@media (min-width: $breakpointLargeTablet) {
				margin: 0 auto 0 var(--marginOuter);
			}
		}
		&.graphic--right {
			@media (min-width: $breakpointLargeTablet) {
				margin: 0 var(--marginOuter) 0 auto;
			}
		}
		&.graphic--centre {
			@media (min-width: $breakpointLargeTablet) {
				--margin: 3rem;
				top: 8dvh;
				height: 62dvh;
			}
			@media (min-width: $breakpointDesktop) {
				--margin: 4rem;
				top: 12dvh;
				height: 58dvh;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--margin: 6rem;
				top: 12dvh;
				height: 58dvh;
			}
		}
		.scrollyteller--debug & {
			outline: 5px solid limegreen;
		}
	}
	.content {
		margin: -100dvh auto 0;
		position: relative;
		z-index: 2;
		// This style doesn't apply to child blocks, just the container
		pointer-events: none;
		&--resized {
			max-width: 127.5rem;
		}
	}
</style>
