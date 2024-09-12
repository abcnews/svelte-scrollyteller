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
	class={`st-panel-root ${panelClass || ''}`}
	class:st-panel-root--left={align === 'left'}
	class:st-panel-root--right={align === 'right'}
	class:st-panel-root--centre={align === 'centre'}
	class:st-panel-root--transparent-blocks={transparentFloat}
	bind:this={panelRef}
>
	<div class="st-panel" use:children={nodes}></div>
</div>

<style lang="scss">
	@import './breakpoints.scss';

	.st-panel-root {
		--panel-radius: 0.75rem;
		--panel-background: var(--color-panel-background, rgba(255, 255, 255, 0.95));
		--panel-color: var(--color-panel-text, #000);
		--panel-opacity: var(--color-panel-opacity, 1);
		--panel-filter: var(--color-panel-filter, blur(2.5px));
		--panel-border: var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));
		--panel-padding: 1rem;
		--panel-margin: 1rem;

		box-sizing: border-box;
		margin: 80vh auto;
		width: calc(100% - calc(var(--panel-margin) * 2));
		position: relative;
		z-index: 1;
		pointer-events: none;
		font-size: 18px;
		max-width: 660px;

		@media (min-width: $breakpointTablet) {
			--panel-padding: 2rem;
			--panel-margin: 2rem;
			max-width: 720px;
		}

		:global([data-scheme='dark']) &,
		:global(.is-dark-mode) & {
			--panel-background: var(--color-panel-background, rgba(15, 15, 15, 0.95));
			--panel-color: var(--color-panel-text, #ebebeb);
			--panel-border: var(--color-panel-border, 1px solid rgba(255, 255, 255, 0.15));
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
			@media (min-width: $breakpointLargeTablet) {
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
				--maxWidth: 45%;
				// outer margin
				--panel-margin: 2rem;
				// inner margin divided by 2 because the vis also adds half a margin
				--panel-margin-inner: calc(var(--panel-margin) / 2);

				max-width: calc(var(--maxWidth) - calc(var(--panel-margin) + var(--panel-margin-inner)));
				margin: 30vh 0 30vh var(--panel-margin);
				font-size: 18px;

				&.st-panel-root--transparent-blocks {
					--panel-filter: none;
					--panel-background: none;
					--panel-border: none;
					--panel-padding: 0;
				}
				&.first {
					margin-top: 50dvh;
				}
			}
			@media (min-width: $breakpointDesktop) {
				--panel-margin: 3rem;
				--maxWidth: 40%;
				font-size: 18px;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--panel-margin: 4rem;
				--maxWidth: 40%;
				font-size: 20px;
			}
		}

		&--right {
			@media (min-width: $breakpointLargeTablet) {
				margin: 15vh calc(var(--marginLeft) - 1rem) 15vh auto;
			}
		}
	}
	.st-panel {
		-webkit-backdrop-filter: var(--panel-filter);
		backdrop-filter: var(--panel-filter);
		color: var(--panel-color);
		border-radius: var(--panel-radius);
		padding: var(--panel-padding);
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
