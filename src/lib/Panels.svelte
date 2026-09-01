<script lang="ts">
  import type { ComponentType } from "svelte";
  import Panel from "./Panel.svelte";
  import type { PanelDefinition, PanelRef, Style } from "./types.js";

  interface Props {
    panelRoot?: HTMLElement;
    layout: Style;
    panels: PanelDefinition[];
    customPanel?: ComponentType | null;
    steps?: PanelRef[];
    currentPanel?: number;
  }

  let {
    panelRoot = $bindable(),
    layout,
    panels,
    customPanel = null,
    steps = $bindable([]),
    currentPanel = 0,
  }: Props = $props();
</script>

<div class="content" bind:this={panelRoot}>
  {#each panels as panel, i}
    {@const align = panel.align || layout.align || "centre"}
    {@const isFirst = i === 0}
    {@const isLast = i === panels.length - 1}
    {@const panelClass = `${panel.panelClass || ""}${isFirst ? " first" : ""}${isLast ? " last" : ""}`}
    {#if customPanel}
      {@const SvelteComponent = customPanel}
      <SvelteComponent {...panel} {steps} {currentPanel} />
    {:else}
      <Panel
        {...panel}
        i={i}
        {align}
        transparentFloat={layout.transparentFloat}
        {panelClass}
        bind:panelRef={steps[i]}
        {currentPanel}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;

  .content {
    margin-top: -100dvh;
    margin-bottom: 0;
    // add bottom padding otherwise the `.last` panel margins collapse to 0
    padding-bottom: 1px;
    position: relative;
    z-index: 2;
    // This style doesn't apply to child blocks, just the container
    pointer-events: none;
    font-size: 1.125rem;
    width: 100%;
  }

  :global(.scrollyteller--mobile-row-variant),
  :global(.scrollyteller-wrapper--mobile-row-variant) {
    @media (max-width: breakpoints.$breakpointLargeTablet) {
      .content {
        margin-top: 0;
      }
    }
  }
</style>

