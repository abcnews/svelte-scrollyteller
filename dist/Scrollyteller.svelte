<script lang="ts" generics="Data = any">import { onMount, setContext } from "svelte";
import { getScrollSpeed } from "./Scrollyteller/Scrollyteller.util";
import OnProgressHandler from "./Scrollyteller/OnProgressHandler.svelte";
import PanelObserver from "./Scrollyteller/PanelObserver.svelte";
import ScreenDimsStoreUpdater from "./Scrollyteller/ScreenDimsStoreUpdater.svelte";
import { setSteps, setMargin, setVizDims, setGraphicRootDims, setRatio, setScreenDims, setGlobalAlign, setMobileVariant, setIsSplitScreen, setIsMobileRowMode, setMaxScrollytellerWidth, setMaxGraphicWidth, setCurrentPanel, } from "./stores";
import Panels from "./Panels.svelte";
import Viz from "./Viz.svelte";
setContext("steps", setSteps());
setContext("margin", setMargin());
const vizDimsStore = setContext("vizDims", setVizDims());
const graphicRootDimsStore = setContext("graphicRootDims", setGraphicRootDims());
const ratioStore = setContext("ratio", setRatio());
const screenDimsStore = setContext("screenDims", setScreenDims());
const globalAlignStore = setContext("globalAlign", setGlobalAlign());
const mobileVariantStore = setContext("mobileVariant", setMobileVariant());
const isSplitScreenStore = setContext("isSplitScreen", setIsSplitScreen([screenDimsStore, globalAlignStore]));
setContext("isMobileRowMode", setIsMobileRowMode([screenDimsStore, mobileVariantStore]));
const maxScrollytellerWidthStore = setContext("maxScrollytellerWidth", setMaxScrollytellerWidth([isSplitScreenStore]));
const maxGraphicWidthStore = setContext("maxGraphicWidth", setMaxGraphicWidth([
    isSplitScreenStore,
    graphicRootDimsStore,
    screenDimsStore,
    ratioStore,
    maxScrollytellerWidthStore,
]));
setContext("currentPanel", setCurrentPanel());
let { customPanel = null, panels, onProgress = (type, payload) => { }, onMarker = (marker) => { }, onLoad = () => { }, observerOptions = undefined, discardSlot = false, layout = {}, ratio = 1, vizMarkerThreshold = 20, children, } = $props();
const isOdyssey = !!window.__IS_ODYSSEY_FORMAT__;
let scrollytellerRef = $state();
/** The contents of the current marker as passed in from the library consumer */
let marker = $state();
let isInViewport = $state(false);
let scrollSpeed = 0;
let deferUntilScrollSettlesActions = [];
let panelRoot = $state();
const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) => deferUntilScrollSettles(() => {
    isInViewport = scrollytellerEntry.isIntersecting;
}));
const deferUntilScrollSettles = (fn) => {
    if (scrollSpeed < maxScrollSpeed) {
        fn();
    }
    else {
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
    if (discardSlot) {
        scrollytellerObserver.observe(scrollytellerRef);
    }
    getScrollSpeed((newSpeed) => {
        scrollSpeed = newSpeed;
        runDeferredActions();
    });
});
let _layout = $derived({
    align: layout.align || "centre",
    mobileVariant: layout.mobileVariant || "blocks", // or rows
    resizeInteractive: layout.resizeInteractive ?? true,
    transparentFloat: layout.transparentFloat ?? ["left", "right"].includes(layout.align),
});
let _observerOptions = $derived({
    rootMargin: _layout.mobileVariant === "rows" ? "-50% 0% 0% 0%" : undefined,
    ...(observerOptions || {}),
});
$effect(() => {
    $ratioStore = ratio;
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
        deferUntilScrollSettles(() => onMarker($state.snapshot(marker)));
});
// Debug mode should highlight blocks, graphic & show which breakpoint we're at
let isDebug = $derived(typeof location !== "undefined" && location.hash === "#debug=true");
</script>

{#if onProgress}
  <OnProgressHandler {scrollytellerRef} {onProgress} />
{/if}

<ScreenDimsStoreUpdater
  align={_layout.align}
  mobileVariant={_layout.mobileVariant}
/>
<PanelObserver
  bind:marker
  observerOptions={_observerOptions}
  {vizMarkerThreshold}
/>

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
  style:opacity={$vizDimsStore.status === "ready" ? 1 : 0}
>
  {#if !_layout.resizeInteractive}
    <Viz layout={_layout} {isInViewport} {discardSlot} {onLoad}
      >{@render children?.()}</Viz
    >
  {/if}
  <div
    class="scrollyteller"
    class:scrollyteller--resized={_layout.resizeInteractive}
    class:scrollyteller--debug={isDebug}
    class:scrollyteller--columns={["left", "right"].includes(_layout.align)}
    class:scrollyteller--mobile-row-variant={["rows"].includes(
      _layout.mobileVariant
    )}
    style:--maxScrollytellerWidthPx={$maxScrollytellerWidthStore + "px"}
    style:--rightColumnWidth={`min(calc(var(--maxScrollytellerWidth) * var(--vizMaxWidth)), ${$maxGraphicWidthStore}px)`}
    bind:this={scrollytellerRef}
  >
    {#if _layout.resizeInteractive}
      <Viz layout={_layout} {isInViewport} {discardSlot} {onLoad}
        >{@render children?.()}</Viz
      >
    {/if}
    <Panels layout={_layout} {panels} {customPanel} bind:panelRoot />
  </div>
</div>

<style>.scrollyteller-wrapper {
  position: relative;
  transition: opacity 0.25s;
}

.scrollyteller {
  position: relative;
  --maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);
  --marginOuter: 1rem;
  margin: 0 auto;
  max-width: calc(var(--maxScrollytellerWidth) - var(--marginOuter) * 2);
  --vizMaxWidth: 1;
  --vizMarginOuter: 1.5rem;
  /* Force full width when using the mobile row variant */
}
@media (max-width: 62rem) {
  .scrollyteller.scrollyteller--mobile-row-variant {
    --marginOuter: 0;
    --vizMarginOuter: 0;
  }
}
@media (min-width: 46.5rem) {
  .scrollyteller {
    --marginOuter: 2rem;
    --vizMarginOuter: 3rem;
  }
}
@media (min-width: 62rem) {
  .scrollyteller {
    --marginOuter: 2rem;
    --vizMarginOuter: 3rem;
    --vizMaxWidth: 0.55;
  }
  .scrollyteller--columns {
    width: fit-content;
  }
}
@media (min-width: 75rem) {
  .scrollyteller {
    --marginOuter: 3rem;
    --vizMarginOuter: 4rem;
    --vizMaxWidth: 0.7;
  }
}
@media (min-width: 90rem) {
  .scrollyteller {
    --marginOuter: 4rem;
    --vizMarginOuter: 6rem;
  }
}
.scrollyteller--debug:after {
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
}
@media (min-width: 46.5rem) {
  .scrollyteller--debug:after {
    content: "Tablet";
  }
}
@media (min-width: 62rem) {
  .scrollyteller--debug:after {
    content: "LargeTablet";
  }
}
@media (min-width: 75rem) {
  .scrollyteller--debug:after {
    content: "Desktop";
  }
}
@media (min-width: 90rem) {
  .scrollyteller--debug:after {
    content: "LargeDesktop";
  }
}</style>
