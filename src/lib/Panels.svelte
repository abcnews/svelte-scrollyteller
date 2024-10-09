<script lang="ts">
	import type { ComponentType } from 'svelte';
	import Panel from './Panel.svelte';
	import type { PanelDefinition, PanelRef, Style } from './types';

	export let layout: Style;
	export let panels: PanelDefinition[];
	export let customPanel: ComponentType | null = null;
	export let steps: PanelRef[] = [];

	/**
	 * Panels grouped by `align` property. We render a container per alignment
	 * so we can have multiple left/right/centred panels in one scrollyteller.
	 */
	let panelGroups = [];
	$: {
		panelGroups = [];
		let group;
		panels.forEach(({ align = layout.align, panelClass = '', ...panel }, i) => {
			if (align !== group?.align) {
				group && panelGroups.push(group);
				group = { align, panels: [] };
			}

			if (i === 0) panelClass += ' first';
			if (i === panels.length - 1) panelClass += ' last';
			group.panels.push({ ...panel, panelClass });
		});
		panelGroups.push(group);
	}

	$: console.log({ panelGroups, panels, layout });
</script>

{#each panelGroups as group}
	<div
		class="content"
		class:content--centre={group.align === 'centre'}
		class:content--right={group.align === 'right'}
		class:content--left={group.align === 'left'}
	>
		{#each group.panels as panel}
			{#if customPanel}
				<svelte:component this={customPanel} {...panel} {steps} />
			{:else}
				<Panel
					props={{
						...panel,
						align: panel.align || layout.align,
						transparentFloat: layout.transparentFloat,
						steps
					}}
				/>
			{/if}
		{/each}
	</div>
{/each}

<style lang="scss">
	@import './breakpoints.scss';
	.content {
		margin: -100dvh auto 0;
		// add bottom padding otherwise the `.last` panel margins collapse to 0
		padding-bottom:1px;
		position: relative;
		z-index: 2;
		// This style doesn't apply to child blocks, just the container
		pointer-events: none;
		font-size: 1.125rem;
	}
	.content {
		&--centre {
			@media (min-width: $breakpointLargeTablet) {
				max-width: 48.75rem;
			}

			@media (min-width: $breakpointDesktop) {
			}

			@media (min-width: $breakpointLargeDesktop) {
				max-width: 56.25rem;
			}
		}

		&--left,
		&--right {
			max-width: 127.5rem;
			margin-left: 0;
			@media (min-width: $breakpointLargeTablet) {
				max-width: 40rem;
				margin-right: calc(var(--rightColumnWidth, 100px) + calc(var(--marginOuter) * 1));
				font-size: 1.125rem;
			}
			@media (min-width: $breakpointDesktop) {
				font-size: 1.125rem;
			}
			@media (min-width: $breakpointLargeDesktop) {
				max-width: 45rem;
				font-size: 1.25rem;
			}
		}
		&--right {
			margin-right: 0;
			margin-left: calc(var(--rightColumnWidth, 100px) + calc(var(--marginOuter) * 1));
		}
	}
</style>
