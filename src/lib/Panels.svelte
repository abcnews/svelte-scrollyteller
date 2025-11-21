<script lang="ts">
  import type { ComponentType } from "svelte";
  import Panel from "./Panel.svelte";
  import type { PanelDefinition, PanelRef, Style } from "./types.js";

  interface Props {
    panelRoot: any;
    layout: Style;
    panels: PanelDefinition[];
    customPanel?: ComponentType | null;
    steps?: PanelRef[];
  }

  let {
    panelRoot = $bindable(),
    layout,
    panels,
    customPanel = null,
    steps = [],
  }: Props = $props();

  /**
   * Panels grouped by `align` property. We render a container per alignment
   * so we can have multiple left/right/centred panels in one scrollyteller.
   */
  let panelGroups = $derived.by(() => {
    const newPanelGroups = [];
    let group;
    panels.forEach(({ align = layout.align, panelClass = "", ...panel }, i) => {
      if (align !== group?.align) {
        group && newPanelGroups.push(group);
        group = { align, panels: [] };
      }

      if (i === 0) panelClass += " first";
      if (i === panels.length - 1) panelClass += " last";
      group.panels.push({ ...panel, panelClass, i });
    });
    newPanelGroups.push(group);
    return newPanelGroups;
  });
</script>

{#each panelGroups as group}
  <div class="panel-wrapper" bind:this={panelRoot}>
    <div
      class="content"
      class:content--centre={group.align === "centre"}
      class:content--right={group.align === "right"}
      class:content--left={group.align === "left"}
    >
      {#each group.panels as panel}
        {#if customPanel}
          {@const SvelteComponent = customPanel}
          <SvelteComponent {...panel} {steps} />
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
  </div>
{/each}

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;

  .content {
    margin: -100dvh auto 0;
    // add bottom padding otherwise the `.last` panel margins collapse to 0
    padding-bottom: 1px;
    position: relative;
    z-index: 2;
    // This style doesn't apply to child blocks, just the container
    pointer-events: none;
    font-size: 1.125rem;
  }
  .content {
    &--centre {
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        max-width: 48.75rem;
      }

      @media (min-width: breakpoints.$breakpointDesktop) {
      }

      @media (min-width: breakpoints.$breakpointLargeDesktop) {
        max-width: 56.25rem;
      }
    }

    &--left,
    &--right {
      max-width: 127.5rem;
      margin-left: 0;
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        max-width: 40rem;
        margin-right: calc(
          var(--rightColumnWidth, 100px) + calc(var(--marginOuter) * 1)
        );
        font-size: 1.125rem;
      }
      @media (min-width: breakpoints.$breakpointDesktop) {
        font-size: 1.125rem;
      }
      @media (min-width: breakpoints.$breakpointLargeDesktop) {
        max-width: 45rem;
        font-size: 1.25rem;
      }
    }
    &--right {
      margin-right: 0;
      margin-left: calc(
        var(--rightColumnWidth, 100px) + calc(var(--marginOuter) * 1)
      );
    }
  }
</style>
