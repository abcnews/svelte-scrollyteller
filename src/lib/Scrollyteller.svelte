<script lang="ts" generics="Data = any">
  import type { ComponentType } from "svelte";
  import { onMount } from "svelte";
  import type { PanelDefinition, Style, Dims, PanelRef } from "./types.js";
  import { useScrollManager } from "./Scrollyteller/useScrollManager.svelte.js";
  import Panels from "./Panels.svelte";
  import Viz from "./Viz.svelte";

  /** Each panel inserts itself into this list when it instantiates */
  let steps = $state<PanelRef[]>([]);
  /** Raw dimensions of the viz. Used to trigger panels when they hit 20% of the viz */
  let vizDims = $state<Dims>({ status: "loading", dims: [0, 0] });
  /** Dims of the root container inside which the viz sits */
  let graphicRootDims = $state<Dims>({ status: "loading", dims: [0, 0] });
  /** Reactive container width measured via Svelte 5 bind:clientWidth */
  let containerWidth = $state(0);

  interface Props {
    panels: PanelDefinition<Data>[];
    customPanel?: ComponentType | null;
    /** Clamped active panel index (0 to N-1), safe for indexing data arrays */
    currentPanel?: number;
    /** Raw lifecycle panel index (-1 for prelude, 0..N-1 for panels, N for outro) */
    virtualPanel?: number;
    /** Active panel's custom data payload (undefined during prelude/outro) */
    marker?: Data | undefined;
    /** Progress percentage through current active panel or prelude/outro (0.0 to 1.0) */
    panelPct?: number;
    /** Overall scroll progress through scrollyteller (unclamped: <0 before start, 0..1, >1 after end) */
    scrollPct?: number;
    /** Diff in pixels between previous scroll events, useful for determining velocity/chunky scroll wheel vs smooth trackpad */
    scrollDelta?: number;
    /** Viewport coverage progress (0.0 to 1.0) */
    rootPct?: number;
    onLoad?: (arg: HTMLElement) => void;
    layout?: Style;
    ratio?: number;
    /**
     * Percent past the bottom of the viz the graphic has to be before it triggers. Default 20 (20%)
     */
    vizMarkerThreshold?: number;
    children?: import("svelte").Snippet;
  }

  let {
    panels,
    customPanel = null,
    currentPanel = $bindable(0),
    virtualPanel = $bindable(-1),
    marker = $bindable(undefined),
    panelPct = $bindable(0),
    scrollPct = $bindable(0),
    scrollDelta = $bindable(-3),
    rootPct = $bindable(0),
    onLoad = () => {},
    layout = {},
    ratio = 1,
    vizMarkerThreshold = 20,
    children,
  }: Props = $props();

  const isOdyssey = !!window.__IS_ODYSSEY_FORMAT__;

  let scrollytellerRef: HTMLElement | undefined = $state();
  let panelRoot = $state<HTMLElement | undefined>();

  // Synchronise marker prop with the active panel data
  $effect(() => {
    marker = panels[currentPanel]?.data;
  });

  import { useLayoutManager } from "./Scrollyteller/useLayoutManager.svelte.js";

  const getLayoutState = useLayoutManager({
    get containerWidth() { return containerWidth; },
    get graphicRootDims() { return graphicRootDims; },
    get layout() { return layout; },
    get ratio() { return ratio; },
  });

  let layoutCtx = $derived(getLayoutState());

  let vizEl = $state<HTMLElement>();
    
  // prettier-ignore
  useScrollManager({
    get scrollytellerRef() { return scrollytellerRef; },
    get vizEl() { return vizEl; },
    get steps() { return steps; },
    get vizMarkerThreshold() { return vizMarkerThreshold; },
    set currentPanel(v) { currentPanel = v; },
    set virtualPanel(v) { virtualPanel = v; },
    set panelPct(v) { panelPct = v; },
    set scrollPct(v) { scrollPct = v; },
    set rootPct(v) { rootPct = v; },
    set scrollDelta(delta) { scrollDelta = delta; },
  });
</script>

<svelte:head>
  {#if isOdyssey}
    <style>
      /* styles required to make position sticky work */
      /* existing styles on an Odyssey body are preventing position sticky from 'sticking' */
      body {
        overflow: visible;
      }
    </style>
  {/if}
</svelte:head>

<div
  class="scrollyteller-wrapper"
  bind:clientWidth={containerWidth}
  class:scrollyteller-wrapper--mobile-row-variant={layoutCtx.mobileVariant === "rows"}
  style:opacity={vizDims.status === "ready" ? 1 : 0}
>
  {#if !layoutCtx.resizeInteractive}
    <Viz
      {onLoad}
      bind:vizDims
      bind:graphicRootDims
      bind:vizEl>{@render children?.()}</Viz
    >
  {/if}
  <div
    class="scrollyteller"
    class:scrollyteller--resized={layoutCtx.resizeInteractive}
    class:scrollyteller--debug={layoutCtx.isDebug}
    class:scrollyteller--columns={["left", "right"].includes(layoutCtx.align)}
    class:scrollyteller--mobile-row-variant={layoutCtx.mobileVariant === "rows"}
    style:max-width={`${layoutCtx.scrollytellerWidthPx}px`}
    bind:this={scrollytellerRef}
  >
    {#if layoutCtx.resizeInteractive}
      <Viz
        {onLoad}
        bind:vizDims
        bind:graphicRootDims
        bind:vizEl>{@render children?.()}</Viz
      >
    {/if}
    <Panels
      {panels}
      {customPanel}
      bind:panelRoot
      bind:steps
      currentPanel={virtualPanel}
    />
  </div>
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;
  .scrollyteller-wrapper {
    position: relative;
    transition: opacity 0.25s;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
  .scrollyteller {
    position: relative;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;

    &--debug:after {
      content: "Mobile";
      position: fixed;
      right: 0.5rem;
      top: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      color: black;
      border: 5px solid limegreen;
      border-radius: 1rem;
      z-index: 110;
      @media (min-width: breakpoints.$breakpointTablet) {
        content: "Tablet";
      }
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        content: "LargeTablet";
      }
      @media (min-width: breakpoints.$breakpointDesktop) {
        content: "Desktop";
      }
      @media (min-width: breakpoints.$breakpointLargeDesktop) {
        content: "LargeDesktop";
      }
    }
  }
</style>
