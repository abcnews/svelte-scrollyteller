<script lang="ts" generics="Data = any">
  import type { ComponentType } from "svelte";
  import { onMount } from "svelte";
  import type { PanelDefinition, Style, Dims, PanelRef } from "./types.js";
  import { getScrollSpeed } from "./Scrollyteller/Scrollyteller.util.js";
  import { useOnProgressHandler } from "./Scrollyteller/useOnProgressHandler.svelte.js";
  import { usePanelObserver } from "./Scrollyteller/usePanelObserver.svelte.js";
  import Panels from "./Panels.svelte";
  import Viz from "./Viz.svelte";
  import { LARGE_TABLET_BREAKPOINT } from "./constants.js";

  /** Each panel inserts itself into this list when it instantiates */
  let steps = $state<PanelRef[]>([]);
  /** Raw dimensions of the viz. Used to trigger panels when they hit 20% of the viz */
  let vizDims = $state<Dims>({ status: "loading", dims: [0, 0] });
  /** Dims of the root container inside which the viz sits */
  let graphicRootDims = $state<Dims>({ status: "loading", dims: [0, 0] });
  /** Reactive window.innerWidth/innerHeight */
  let screenDims = $state<[number, number]>([0, 0]);
  let currentPanel = $state(0);

  interface Props {
    customPanel?: ComponentType | null;
    panels: PanelDefinition<Data>[];
    onProgress?: (
      type: string,
      payload: {
        boundingRect: DOMRect;
        rootPct: number;
        scrollPct: number;
      },
    ) => void;
    onMarker?: (marker: Data) => void;
    onLoad?: (arg: HTMLElement) => void;
    observerOptions?: IntersectionObserverInit;
    /**
     * When `true` we remove the slot from the DOM when not in the viewport, and
     * debounce loading markers while the browser is scrolling quickly.
     *
     * This is useful to free up layers/memory/CPU in complex interactives,
     * especially to prevent out of memory crash issues with iPhone Safari.
     *
     * The trade-off is you may need to use `<link rel="preload"` for resources
     * that don't appear in the page by default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload mdn preload docs}
     */
    discardSlot?: boolean;
    layout?: Style;
    ratio?: number;
    /**
     * Percent past the bottom of the viz the graphic has to be before it triggers. Default 20 (20%)
     */
    vizMarkerThreshold?: number;
    children?: import("svelte").Snippet;
  }

  let {
    customPanel = null,
    panels,
    onProgress = (
      type: string,
      payload: {
        boundingRect: DOMRect;
        rootPct: number;
        scrollPct: number;
      },
    ) => {},
    onMarker = (marker: Data) => {},
    onLoad = () => {},
    observerOptions = undefined,
    discardSlot = false,
    layout = {},
    ratio = 1,
    vizMarkerThreshold = 20,
    children,
  }: Props = $props();

  const isOdyssey = !!window.__IS_ODYSSEY_FORMAT__;

  let scrollytellerRef: HTMLElement | undefined = $state();
  /** The contents of the current marker as passed in from the library consumer */
  let marker = $state<Data>();
  let isInViewport = $state(false);
  let scrollSpeed = 0;
  let deferUntilScrollSettlesActions: (() => void)[] = [];
  let panelRoot = $state<HTMLElement | undefined>();

  const scrollytellerObserver = new IntersectionObserver(
    ([scrollytellerEntry]) =>
      deferUntilScrollSettles(() => {
        isInViewport = scrollytellerEntry.isIntersecting;
      }),
  );

  const deferUntilScrollSettles = (fn: () => void) => {
    if (scrollSpeed < maxScrollSpeed) {
      fn();
    } else {
      deferUntilScrollSettlesActions = [...deferUntilScrollSettlesActions, fn];
    }
  };

  const runDeferredActions = () => {
    if (scrollSpeed < maxScrollSpeed) {
      if (deferUntilScrollSettlesActions.length) {
        deferUntilScrollSettlesActions.forEach((fn) => fn());
        deferUntilScrollSettlesActions = [];
      }
    }
  };

  onMount(() => {
    screenDims = [window.innerWidth, window.innerHeight];

    if (discardSlot && scrollytellerRef) {
      scrollytellerObserver.observe(scrollytellerRef);
    }

    getScrollSpeed((newSpeed) => {
      scrollSpeed = newSpeed;
      runDeferredActions();
    });
  });

  let align = $derived(layout.align || "centre");
  let mobileVariant = $derived(layout.mobileVariant || "blocks");
  let resizeInteractive = $derived(layout.resizeInteractive ?? true);
  let transparentFloat = $derived(
    layout.transparentFloat ?? ["left", "right"].includes(align),
  );

  /** Split screen mode happens when left/right aligned + not mobile */
  let isSplitScreen = $derived(
    ["left", "right"].includes(align) &&
      screenDims[0] >= LARGE_TABLET_BREAKPOINT,
  );

  let isMobileRowMode = $derived(
    mobileVariant === "rows" && screenDims[0] < LARGE_TABLET_BREAKPOINT,
  );

  /** The max width when the scrollyteller centres itself in the page */
  let maxScrollytellerWidth = $derived(isSplitScreen ? 2040 : 1e6);

  /**
   * Given the ratio of the graphic, work out whether it fits in the column and if
   * not, return how wide the column should be so there's no whitespace;
   */
  let maxGraphicWidth = $derived.by(() => {
    if (!isSplitScreen) {
      return 1e6;
    }
    const [screenWidth] = screenDims;
    const [, columnHeight] = graphicRootDims.dims;
    const columnWidth = Math.min(screenWidth, maxScrollytellerWidth) * 0.6;

    const widthBasedOnHeight = columnHeight * ratio;
    return Math.min(widthBasedOnHeight, columnWidth);
  });

  $effect(() => {
    if (vizMarkerThreshold >= 50) {
      throw new Error("vizMarkerThreshold must be <50% screen height");
    }
  });
  /**
   * When the user is scrolling at a speed greater than this, don't mount
   * new components or update markers.
   */
  let maxScrollSpeed = $derived(discardSlot ? 0.5 : Infinity);
  $effect(() => {
    marker &&
      deferUntilScrollSettles(() => onMarker($state.snapshot(marker) as Data));
  });
  // Debug mode should highlight blocks, graphic & show which breakpoint we're at
  let isDebug = $derived(
    typeof location !== "undefined" && location.hash === "#debug=true",
  );

  // prettier-ignore
  usePanelObserver({
    get marker() { return marker; },
    set marker(v) { marker = v; },
    get observerOptions() { return observerOptions; },
    get vizMarkerThreshold() { return vizMarkerThreshold; },
    get vizDims() { return vizDims; },
    get isSplitScreen() { return isSplitScreen; },
    get isMobileRowMode() { return isMobileRowMode; },
    get screenDims() { return screenDims; },
    get steps() { return steps; },
    set currentPanel(v) { currentPanel = v; }
  });

  // prettier-ignore
  useOnProgressHandler({
    get scrollytellerRef() { return scrollytellerRef; },
    get onProgress() { return onProgress; },
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

<svelte:window
  onresize={() => (screenDims = [window.innerWidth, window.innerHeight])}
/>

<div
  class="scrollyteller-wrapper"
  style:opacity={vizDims.status === "ready" ? 1 : 0}
>
  {#if !resizeInteractive}
    <Viz
      layout={{ align, mobileVariant, resizeInteractive, transparentFloat }}
      {isInViewport}
      {discardSlot}
      {onLoad}
      bind:vizDims
      bind:graphicRootDims>{@render children?.()}</Viz
    >
  {/if}
  <div
    class="scrollyteller"
    class:scrollyteller--resized={resizeInteractive}
    class:scrollyteller--debug={isDebug}
    class:scrollyteller--columns={["left", "right"].includes(align)}
    class:scrollyteller--mobile-row-variant={["rows"].includes(mobileVariant)}
    style:--maxScrollytellerWidthPx={maxScrollytellerWidth + "px"}
    style:--rightColumnWidth={`min(calc(var(--maxScrollytellerWidth) * var(--vizMaxWidth)), ${maxGraphicWidth}px)`}
    bind:this={scrollytellerRef}
  >
    {#if resizeInteractive}
      <Viz
        layout={{ align, mobileVariant, resizeInteractive, transparentFloat }}
        {isInViewport}
        {discardSlot}
        {onLoad}
        bind:vizDims
        bind:graphicRootDims>{@render children?.()}</Viz
      >
    {/if}
    <Panels
      layout={{ align, mobileVariant, resizeInteractive, transparentFloat }}
      {panels}
      {customPanel}
      bind:panelRoot
      bind:steps
      {currentPanel}
    />
  </div>
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;
  .scrollyteller-wrapper {
    position: relative;
    transition: opacity 0.25s;
  }
  .scrollyteller {
    position: relative;
    --maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);
    --marginOuter: 1rem;
    margin: 0 auto;
    max-width: calc(
      var(--maxScrollytellerWidth) - calc(var(--marginOuter) * 2)
    );

    --vizMaxWidth: 1;
    --vizMarginOuter: 1.5rem;

    /* Force full width when using the mobile row variant */
    @media (max-width: breakpoints.$breakpointLargeTablet) {
      &.scrollyteller--mobile-row-variant {
        --marginOuter: 0;
        --vizMarginOuter: 0;
      }
    }

    @media (min-width: breakpoints.$breakpointTablet) {
      --marginOuter: 2rem;
      --vizMarginOuter: 3rem;
    }
    @media (min-width: breakpoints.$breakpointLargeTablet) {
      --marginOuter: 2rem;
      --vizMarginOuter: 3rem;
      --vizMaxWidth: 0.55;

      // When in column mode, use fit-content to collapse whitespace
      // between text & viz
      &--columns {
        width: fit-content;
      }
    }
    @media (min-width: breakpoints.$breakpointDesktop) {
      --marginOuter: 3rem;
      --vizMarginOuter: 4rem;
      --vizMaxWidth: 0.7;
    }
    @media (min-width: breakpoints.$breakpointLargeDesktop) {
      --marginOuter: 4rem;
      --vizMarginOuter: 6rem;
    }

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
