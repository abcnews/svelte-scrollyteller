<script>import Panel from './Panel.svelte';
export let layout;
export let panels;
export let customPanel = null;
export let steps = [];
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

<style>.content {
  margin: -100dvh auto 0;
  position: relative;
  z-index: 2;
}
.content--resized {
  max-width: 127.5rem;
}

@media (min-width: 62rem) {
  .content--left, .content--right {
    --maxWidth: 0.45;
    --actualMaxWidth: calc(min(calc(100vw, var(--maxScrollytellerWidth)) * var(--maxWidth)));
    max-width: calc(var(--actualMaxWidth) - var(--marginOuter) * 1);
    margin-right: calc(var(--rightColumnWidth) + var(--marginOuter) * 1);
  }
}
@media (min-width: 75rem) {
  .content--left, .content--right {
    --maxWidth: 0.4;
  }
}
@media (min-width: 90rem) {
  .content--left, .content--right {
    --maxWidth: 0.4;
  }
}</style>
