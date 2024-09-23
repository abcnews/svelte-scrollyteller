<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import GraphicObserver from './Scrollyteller/GraphicObserver.svelte';

	export let layout;
	export let discardSlot = false;
	export let isInViewport = false;
	const dispatch = createEventDispatcher();

	// emit an event with the viz root, because the web component doesn't
	// support slots & must insert content  manually.
	let graphicRootEl;
	$: if (graphicRootEl) {
		dispatch('load', graphicRootEl);
	}
</script>

<GraphicObserver {graphicRootEl} />

<div
	class="viz"
	class:viz--resized={layout.resizeInteractive}
	class:viz--right={layout.resizeInteractive && layout.align === 'left'}
	class:viz--left={layout.resizeInteractive && layout.align === 'right'}
	class:viz--centre={layout.resizeInteractive && layout.align === 'centre'}
	bind:this={graphicRootEl}
>
	{#if isInViewport || discardSlot === false}
		<slot />
	{/if}
</div>

<style lang="scss">
	@import './breakpoints.scss';
	.viz {
		transform: translate3d(0, 0, 0);
		height: 100dvh;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.viz--resized {
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

		&.viz--left,
		&.viz--right {
			width: var(--rightColumnWidth);
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
		&.viz--left {
			@media (min-width: $breakpointLargeTablet) {
				margin: 0 auto 0 0;
			}
		}
		&.viz--right {
			@media (min-width: $breakpointLargeTablet) {
				margin: 0 0 0 auto;
			}
		}
		&.viz--centre {
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
</style>
