<script lang="ts">
	import { onMount } from 'svelte';
	import { children } from './actions.js';
	import type { PanelDefinition, PanelRef } from './types.js';
	import { steps } from './stores.js';

	export let props: PanelDefinition;

	const { align, transparentFloat, panelClass, data, nodes = [] } = props;

	let panelRef: PanelRef;

	onMount(() => {
		panelRef.scrollyData = data;
		$steps = [...$steps, panelRef];
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

		box-sizing: border-box;
		margin: 80vh auto;
		position: relative;
		z-index: 1;
		pointer-events: none;

		@media (min-width: $breakpointTablet) {
			--panel-padding: 2rem;
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

		&--left,
		&--right {
			@media (min-width: $breakpointLargeTablet) {
				margin-top: 40vh;
				margin-bottom: 40vh;

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
			}
			@media (min-width: $breakpointLargeDesktop) {
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
			pointer-events: all;
			color: var(--panel-color);

			margin-top: 0;
			margin-left: auto !important;
			margin-right: auto !important;

			&:last-child {
				margin-bottom: 0;
			}
		}

		:global(> :is(div, p)) {
			font-family: ABCSans, sans-serif;
			font-size: inherit;
			line-height: 1.666666667;
		}

		& > :global(img) {
			max-width: 66%;
			display: block;
			margin: auto;
			height: auto;
		}

		:global(> :is(h1, h2, h3, h4)) {
			font-family: var(--od-font-stack-serif);
		}
	}
</style>
