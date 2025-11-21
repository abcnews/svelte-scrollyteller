<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { children } from "./actions.js";
  import type { PanelRef } from "./types.js";
  import type { Writable } from "svelte/store";

  const currentPanel = getContext<Writable<number>>("currentPanel");
  const steps = getContext<Writable<PanelRef[]>>("steps");

  interface Props {
    align: string;
    transparentFloat: boolean;
    panelClass: string;
    data: any;
    nodes: Element[];
    i?: any;
  }

  let {
    align,
    transparentFloat,
    panelClass,
    data,
    nodes,
    i = -1,
  }: Props = $props();

  let panelRef = $state<PanelRef>();

  onMount(() => {
    panelRef.scrollyData = data;
    $steps = [...$steps, panelRef];
  });
</script>

<div
  data-align={align}
  data-index={i}
  class={`st-panel-root ${panelClass || ""}`}
  class:st-panel-root--left={align === "left"}
  class:st-panel-root--right={align === "right"}
  class:st-panel-root--centre={align === "centre"}
  class:st-panel-root--transparent-blocks={transparentFloat}
  class:st-panel-root--active={i === $currentPanel}
  bind:this={panelRef}
>
  <div class="st-panel" use:children={nodes}></div>
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;

  :global(.scrollyteller--mobile-row-variant) {
    @media (max-width: breakpoints.$breakpointLargeTablet) {
      /* Mobile row variant doesn't need scrims etc */
      .st-panel::before {
        opacity: 0 !important;
      }

      /* Mobile row variant needs less spacing between panels */
      .st-panel-root {
        margin: 40vh auto;
      }
    }
  }

  .st-panel-root {
    --panel-radius: 0.75rem;
    --panel-background: var(
      --color-panel-background,
      rgba(255, 255, 255, 0.95)
    );
    --panel-color: var(--color-panel-text, #000);
    --panel-opacity: var(--color-panel-opacity, 1);
    --panel-filter: var(--color-panel-filter, blur(2.5px));
    --panel-border: var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));
    --panel-padding: 1rem;
    /* How opaque do we make inactive panels on 2 column mode */
    --panel-opacity-inactive: var(--color-panel-opacity-inactive, 1);

    /** How much margin should we have between panels on 2 column mode */
    --panel-column-margin: var(--color-panel-margin, 40vh);

    box-sizing: border-box;
    margin: 80vh auto;
    position: relative;
    z-index: 1;
    pointer-events: none;

    @media (min-width: breakpoints.$breakpointTablet) {
      --panel-padding: 2rem;
    }

    :global(.scrollyteller--debug) & {
      outline: 5px solid limegreen;
    }

    &.first {
      margin-top: 100dvh;
    }

    &.last {
      margin-bottom: 50vh;
    }

    &--left,
    &--right {
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        margin-top: var(--panel-column-margin);
        margin-bottom: var(--panel-column-margin);
        opacity: 1;

        &.st-panel-root--transparent-blocks.st-panel-root--active {
          opacity: 1;
        }
        &.st-panel-root--transparent-blocks {
          --panel-filter: none;
          --panel-background: none;
          --panel-border: none;
          --panel-padding: 0;
          opacity: var(--panel-opacity-inactive);
        }
        &.first {
          margin-top: 50dvh;
        }
      }
      @media (min-width: breakpoints.$breakpointDesktop) {
      }
      @media (min-width: breakpoints.$breakpointLargeDesktop) {
      }
    }
  }
  .st-panel {
    -webkit-backdrop-filter: var(--panel-filter);
    backdrop-filter: var(--panel-filter);
    color: var(--panel-color);
    border-radius: var(--panel-radius);
    padding: var(--panel-padding);
    max-width: 640px;
    margin: auto;

    &::before {
      content: "";

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
      content: "";
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
