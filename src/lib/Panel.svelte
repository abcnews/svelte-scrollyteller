<script lang="ts">
	import { onMount } from 'svelte';
	import { children } from './actions.js';
	import type { PanelDefinition, PanelRef } from './types.js';

	export let props: PanelDefinition;

	const { align, transparentFloat, panelClass, data, nodes = [], steps = [] } = props;

	let panelRef: PanelRef;

	onMount(() => {
		panelRef.scrollyData = data;
		steps.push(panelRef);
	});
</script>

<div
	data-align={align}
	class={`st-panel ${panelClass || ''}`}
	class:st-panel--left={align === 'left'}
	class:st-panel--right={align === 'right'}
	class:st-panel--centre={align === 'centre'}
	class:st-panel--transparent-blocks={transparentFloat}
	bind:this={panelRef}
	use:children={nodes}
/>

<style lang="scss">
	@import './breakpoints.scss';

	.st-panel {
		--panel-radius: 0.75rem;
		--panel-background: var(--color-panel-background, rgba(245, 245, 245, 0.95));
		--panel-color: var(--color-panel-text, #000);
		--panel-opacity: var(--color-panel-opacity, 1);
		--panel-filter: var(--color-panel-filter, blur(2.5px));
		--panel-border: var(--color-panel-border, none);

		-webkit-backdrop-filter: var(--panel-filter);
		backdrop-filter: var(--panel-filter);
		color: var(--panel-color);
		border-radius: var(--panel-radius);
		box-sizing: border-box;
		margin: 80vh auto;
		width: calc(100% - 2rem);
		position: relative;
		z-index: 1;
		pointer-events: none;
		font-size: 18px;
		padding: 1rem;
		max-width: 660px;

		:global([data-scheme='dark']) &,
		:global(.is-dark-mode) & {
			--panel-background: var(--color-panel-background, rgba(15, 15, 15, 0.95));
			--panel-color: var(--color-panel-text, #ebebeb);
		}
		:global(.scrollyteller--debug) & {
			outline: 5px solid limegreen;
		}

		&.first {
			margin-top: 100dvh;
		}

		&.last {
			margin-bottom: 100vh;
		}

		&--centre {
			@media (min-width: $breakpointTablet) {
				padding: 2rem;
				max-width: 720px;
			}

			@media (min-width: $breakpointLargeTablet) {
				padding: 2rem;
				max-width: 780px;
				font-size: 20px;
			}

			@media (min-width: $breakpointDesktop) {
			}

			@media (min-width: $breakpointLargeDesktop) {
				max-width: 900px;
			}
		}

		&--left,
		&--right {
			@media (min-width: $breakpointLargeTablet) {
				--marginLeft: 2rem;
				--marginRight: 1rem;
				--maxWidth: 45%;
				max-width: calc(var(--maxWidth) - calc(var(--marginLeft) + var(--marginRight)));
				margin: 30vh 0 30vh calc(var(--marginLeft) - 1rem);
				font-size: 18px;

				&.st-panel--transparent-blocks {
					--panel-filter: none;
					--panel-background: none;
				}
				&.first {
					margin-top: 50dvh;
				}
			}
			@media (min-width: $breakpointDesktop) {
				--marginLeft: 3rem;
				--marginRight: 1.5rem;
				--maxWidth: 40%;
				font-size: 18px;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--marginLeft: 4rem;
				--marginRight: 2rem;
				--maxWidth: 40%;
				font-size: 20px;
			}
		}

		&--right {
			@media (min-width: $breakpointLargeTablet) {
				margin: 15vh calc(var(--marginLeft) - 1rem) 15vh auto;
			}
		}

		&::before {
			content: '';

			background-color: var(--panel-background);
			opacity: var(--panel-opacity);
			border-radius: var(--panel-radius);
			border: var(--panel-border);

			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		&::after {
			content: '';
			display: table;
			clear: both;
		}

		:global(> *) {
			font-family: ABCSans, sans-serif;
			font-size: inherit;
			line-height: 1.666666667;
			color: var(--panel-color);

			margin-top: 0;
			margin-left: auto !important;
			margin-right: auto !important;

			pointer-events: all;

			&:last-child {
				margin-bottom: 0;
			}
		}

		& > :global(img) {
			max-width: 66%;
			display: block;
			margin: auto;
			height: auto;
		}
	}
</style>
