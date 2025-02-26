<script lang="ts">export let layout;
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
    panels.forEach(({ align = layout.align, panelClass = '', ...panel }, i) => {
        if (align !== group?.align) {
            group && panelGroups.push(group);
            group = { align, panels: [] };
        }
        if (i === 0)
            panelClass += ' first';
        if (i === panels.length - 1)
            panelClass += ' last';
        group.panels.push({ ...panel, panelClass, i });
    });
    panelGroups.push(group);
}
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
					{...panel}
					align={panel.align || layout.align}
					transparentFloat={layout.transparentFloat}
					{steps}
				/>
			{/if}
		{/each}
	</div>
{/each}

<style>.content {
  margin: -100dvh auto 0;
  padding-bottom: 1px;
  position: relative;
  z-index: 2;
  pointer-events: none;
  font-size: 1.125rem;
}

@media (min-width: 62rem) {
  .content--centre {
    max-width: 48.75rem;
  }
}
@media (min-width: 90rem) {
  .content--centre {
    max-width: 56.25rem;
  }
}
.content--left, .content--right {
  max-width: 127.5rem;
  margin-left: 0;
}
@media (min-width: 62rem) {
  .content--left, .content--right {
    max-width: 40rem;
    margin-right: calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);
    font-size: 1.125rem;
  }
}
@media (min-width: 75rem) {
  .content--left, .content--right {
    font-size: 1.125rem;
  }
}
@media (min-width: 90rem) {
  .content--left, .content--right {
    max-width: 45rem;
    font-size: 1.25rem;
  }
}
.content--right {
  margin-right: 0;
  margin-left: calc(var(--rightColumnWidth, 100px) + var(--marginOuter) * 1);
}</style>
