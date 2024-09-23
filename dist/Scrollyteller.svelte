<script>import { onMount } from 'svelte';
import { ScrollPositions } from './types.js';
import { createEventDispatcher } from 'svelte';
import { getScrollingPos, getScrollSpeed } from './Scrollyteller/Scrollyteller.util';
import OnProgressHandler from './Scrollyteller/OnProgressHandler.svelte';
import DeprecationNotice from './Scrollyteller/DeprecationNotice.svelte';
import PanelObserver from './Scrollyteller/PanelObserver.svelte';
import GraphicObserver from './Scrollyteller/GraphicObserver.svelte';
import ScreenDimsStoreUpdater from './Scrollyteller/ScreenDimsStoreUpdater.svelte';
import { MAX_SCROLLYTELLER_WIDTH, maxGraphicWidth } from './stores';
import Panels from './Panels.svelte';
import Viz from './Viz.svelte';
import ResizeObserver from './Scrollyteller/ResizeObserver.svelte';
const dispatch = createEventDispatcher();
export let customPanel = null;
export let panels;
/** Whether to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default. */
export let onProgress = false;
/** @deprecated please use on:marker instead */
export let onMarker = null;
export let observerOptions = undefined;
/**
 * When `true` we remove the slot from the DOM when not in the viewport, and
 * debounce loading markers while the browser is scrolling quickly.
 *
 * This is useful to free up layers/memory/CPU in complex interactives,
 * especially to prevent out of memory crashe issues with iPhone Safari.
 *
 * The trade-off is you may need to use `<link rel="preload"` for resources
 * that don't appear in the page by default.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload mdn preload docs}
 */
export let discardSlot = false;
export let layout = {};
$: _layout = {
    align: layout.align || 'centre',
    resizeInteractive: layout.resizeInteractive ?? true,
    transparentFloat: layout.transparentFloat ?? ['left', 'right'].includes(layout.align)
};
/**
 * When the user is scrolling at a speed greater than this, don't mount
 * new components or update markers.
 */
$: maxScrollSpeed = discardSlot ? 0.5 : Infinity;
const isOdyssey = window.__IS_ODYSSEY_FORMAT__;
let scrollytellerRef;
let marker;
let scrollingPos;
let isInViewport = false;
let scrollSpeed = 0;
let deferUntilScrollSettlesActions = [];
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
    scrollingPos = getScrollingPos(scrollytellerRef);
    if (scrollingPos === ScrollPositions.ABOVE)
        marker = panels[0].data;
    if (scrollingPos === ScrollPositions.BELOW)
        marker = panels[panels.length - 1].data;
    if (discardSlot) {
        scrollytellerObserver.observe(scrollytellerRef);
    }
    getScrollSpeed((newSpeed) => {
        scrollSpeed = newSpeed;
        runDeferredActions();
    });
});
$: marker && deferUntilScrollSettles(() => dispatch('marker', marker));
// Debug mode should highlight blocks, graphic & show which breakpoint we're at
$: isDebug = typeof location !== 'undefined' && location.hash === '#debug=true';
</script>

{#if onProgress}
	<OnProgressHandler {scrollytellerRef} on:progress />
{/if}

<DeprecationNotice {onProgress} {onMarker} />
<ScreenDimsStoreUpdater align={_layout.align} />
<PanelObserver bind:marker {observerOptions} {isDebug} />
<ResizeObserver {scrollytellerRef} />

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
	class="scrollyteller"
	class:scrollyteller--resized={_layout.resizeInteractive}
	class:scrollyteller--debug={isDebug}
	style:--maxScrollytellerWidthPx={MAX_SCROLLYTELLER_WIDTH + 'px'}
	style:--rightColumnWidth={$maxGraphicWidth ? $maxGraphicWidth + 'px' : 'auto'}
	bind:this={scrollytellerRef}
>
	<Viz layout={_layout} {isInViewport} {discardSlot}><slot /></Viz>
	<Panels layout={_layout} {panels} {customPanel} />
</div>

<style>.scrollyteller {
  position: relative;
}
.scrollyteller--resized {
  --maxScrollytellerWidth: min(var(--maxScrollytellerWidthPx), 100vw);
  max-width: calc(var(--maxScrollytellerWidth) - var(--marginOuter) * 2);
  margin: 0 auto;
  width: fit-content;
  --marginOuter: 1.5rem;
}
@media (min-width: 46.5rem) {
  .scrollyteller--resized {
    --marginOuter: 2rem;
  }
}
@media (min-width: 62rem) {
  .scrollyteller--resized {
    --marginOuter: 2rem;
  }
}
@media (min-width: 75rem) {
  .scrollyteller--resized {
    --marginOuter: 3rem;
  }
}
@media (min-width: 90rem) {
  .scrollyteller--resized {
    --marginOuter: 4rem;
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
