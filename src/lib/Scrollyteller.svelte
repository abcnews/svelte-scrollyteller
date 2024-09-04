<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import type { IntersectionEntries, PanelDefinition, PanelRef } from './types.js';
	import { getScrollSpeed } from './utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	enum ScrollPositions {
		FULL = 'FULL',
		ABOVE = 'ABOVE',
		BELOW = 'BELOW'
	}

	type Style = {
		/**
		 * What styles to apply to panels.
		 * - `centre` - centre panels, default
		 * - `left` - float panels to the left and slot to the right
		 * - `right` - float panels to the right and slot to the left
		 * - `none` - don't apply styles other than font-size. You are responsible for all styling.
		 */
		align?: string;
		/**
		 * Disable block background when panels go left/right. Default true when
		 * global is left/right.
		 */
		transparentFloat?: boolean;

		/**
		 * Resize the interactive to fit the left/right dimensions
		 */
		resizeInteractive?: boolean;
	};

	export let customPanel: ComponentType | null = null;
	export let panels: PanelDefinition[];
	/** Whether to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default. */
	export let onProgress: boolean = false;
	/** @deprecated please use on:marker instead */
	export let onMarker: () => void = null;
	export let observerOptions: IntersectionObserverInit = {
		threshold: 0.5
	};
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

	$: console.log('yes but', { layout, _layout });

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
		scrollingPos = getScrollingPos();
		if (scrollingPos === ScrollPositions.ABOVE) marker = panels[0].data;
		if (scrollingPos === ScrollPositions.BELOW) marker = panels[panels.length - 1].data;

		steps.forEach((step, i) => {
			panelObserver.observe(step);
		});

		if (discardSlot) {
			scrollytellerObserver.observe(scrollytellerRef);
		}

		getScrollSpeed((newSpeed) => {
			scrollSpeed = newSpeed;
			runDeferredActions();
		});
	});

	const scrollHandler = () => {
		const rootRect = scrollytellerRef.getBoundingClientRect();

		dispatch('progress', {
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};

	$: {
		// 2024-08 : This block checks for deprecated usage & throws helpful errors.
		// Please remove it after a suitable time has passed.
		if (typeof onProgress === 'function') {
			throw new Error('the onProgress callback is deprecated. Please use on:progress');
		}
		if (typeof onMarker === 'function') {
			throw new Error('the onMarker callback is deprecated. Please use on:marker');
		}
	}

	$: marker && deferUntilScrollSettles(() => dispatch('marker', marker));
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

<div
	class="scrollyteller"
	class:scrollyteller--resized={_layout.resizeInteractive}
	bind:this={scrollytellerRef}
>
	<div
		class="graphic"
		class:graphic--resized={_layout.resizeInteractive}
		class:graphic--right={_layout.resizeInteractive && _layout.align === 'left'}
		class:graphic--left={_layout.resizeInteractive && _layout.align === 'right'}
		class:graphic--centre={_layout.resizeInteractive && _layout.align === 'centre'}
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
			max-width: 2040px;
			margin: 0 auto;
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
			--margin: 3rem;
			top: 8dvh;
			height: 62dvh;
		}

		&.graphic--left,
		&.graphic--right {
			@media (min-width: $breakpointLargeTablet) {
				align-items: center;
				--marginCentre: 1rem;
				--marginOuter: 2rem;
				height: 84dvh;
				top: 8dvh;
				--maxWidth: 55%;
				max-width: calc(var(--maxWidth) - calc(var(--marginCentre) + var(--marginOuter)));
			}
			@media (min-width: $breakpointDesktop) {
				--marginCentre: 1.5rem;
				--marginOuter: 3rem;
				--maxWidth: 60%;
				height: 76dvh;
				top: 12dvh;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--marginCentre: 2rem;
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
	}
	.content {
		margin: -100dvh auto 0;
		position: relative;
		z-index: 2;
		&--resized {
			max-width: 2040px;
		}
		// position: relative;
		// z-index: 2;
		// overflow: hidden;
		// min-height: 100dvh;
		// display: flex;
		// flex-direction: column;
		// pointer-events: none;
	}
</style>
