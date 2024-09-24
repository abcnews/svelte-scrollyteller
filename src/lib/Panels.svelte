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
		panels.forEach(({ align = layout.align, ...panel }) => {
			if (align !== group?.align) {
				group && panelGroups.push(group);
				group = { align, panels: [] };
			}
			group.panels.push(panel);
		});
		panelGroups.push(group);
	}

	$: console.log({ panelGroups, panels, layout });
</script>

{#each panelGroups as group}
	<div
		class="content"
		class:content--right={group.align === 'left'}
		class:content--left={group.align === 'right'}
	>
		{#each group.panels as panel, i}
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
						align: panel.align || layout.align,
						transparentFloat: layout.transparentFloat,
						steps,
						panelClass
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
		position: relative;
		z-index: 2;
		// This style doesn't apply to child blocks, just the container
		// pointer-events: none;
	}
	.content {
		&--left,
		&--right {
			max-width: 127.5rem;
			margin-left: 0;
			@media (min-width: $breakpointLargeTablet) {
				--maxWidth: 0.45;
				--actualMaxWidth: calc(min(100vw, var(--maxScrollytellerWidth)) * var(--maxWidth));

				max-width: calc(var(--actualMaxWidth) - calc(var(--marginOuter) * 1));
				margin-right: calc(var(--rightColumnWidth, 100px) + calc(var(--marginOuter) * 1));
			}
			@media (min-width: $breakpointDesktop) {
				--maxWidth: 0.4;
			}
			@media (min-width: $breakpointLargeDesktop) {
				--maxWidth: 0.4;
			}
		}
	}
</style>
