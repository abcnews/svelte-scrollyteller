<script lang="ts">import { createEventDispatcher } from 'svelte';
import GraphicObserver from './Scrollyteller/GraphicObserver.svelte';
export let layout;
export let discardSlot = false;
export let isInViewport = false;
export let onLoad = () => { };
const dispatch = createEventDispatcher();
// emit an event with the viz root, because the web component doesn't
// support slots & must insert content  manually.
let graphicRootEl;
$: if (graphicRootEl) {
    onLoad(graphicRootEl);
}
</script>

<GraphicObserver {graphicRootEl} />

<div
	class="viz"
	class:viz--resized={layout.resizeInteractive}
	class:viz--right={layout.resizeInteractive && layout.align === 'left'}
	class:viz--left={layout.resizeInteractive && layout.align === 'right'}
	class:viz--centre={layout.resizeInteractive && layout.align === 'centre'}
	bind:this={graphicRootEl}
>
	{#if isInViewport || discardSlot === false}
		<slot />
	{/if}
</div>

<style>:global(.scrollyteller--mobile-row-variant) {
  --marginOuter: 0;
  --vizMarginOuter: 0;
}
@media (max-width: 62rem) {
  :global(.scrollyteller--mobile-row-variant) .viz--resized {
    z-index: 10;
    top: 0;
    background: white;
    margin: 0;
    height: 40dvh;
  }
}

.viz {
  transform: translate3d(0, 0, 0);
  height: 100dvh;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}

.viz--resized {
  container-type: size;
  height: 60dvh;
  top: 10dvh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  margin: 0 auto;
  width: calc(100% - var(--marginOuter) * 2);
  max-width: calc(100vw - var(--vizMarginOuter) * 2);
}
@media (min-width: 46.5rem) {
  .viz--resized {
    --margin: 4rem;
    top: 8dvh;
    height: 62dvh;
  }
}
.viz--resized.viz--left, .viz--resized.viz--right {
  width: var(--rightColumnWidth);
}
@media (min-width: 62rem) {
  .viz--resized.viz--left, .viz--resized.viz--right {
    align-items: center;
    height: 84dvh;
    top: 8dvh;
  }
}
@media (min-width: 75rem) {
  .viz--resized.viz--left, .viz--resized.viz--right {
    height: 76dvh;
    top: 12dvh;
  }
}
@media (min-width: 90rem) {
  .viz--resized.viz--left, .viz--resized.viz--right {
    top: 10dvh;
    height: 80dvh;
  }
}
@media (min-width: 62rem) {
  .viz--resized.viz--left {
    margin: 0 auto 0 0;
  }
}
@media (min-width: 62rem) {
  .viz--resized.viz--right {
    margin: 0 0 0 auto;
  }
}
@media (min-width: 62rem) {
  .viz--resized.viz--centre {
    top: 8dvh;
    height: 62dvh;
  }
}
@media (min-width: 75rem) {
  .viz--resized.viz--centre {
    top: 12dvh;
    height: 58dvh;
  }
}
@media (min-width: 90rem) {
  .viz--resized.viz--centre {
    top: 12dvh;
    height: 58dvh;
  }
}
:global(.scrollyteller--debug) .viz--resized {
  outline: 5px solid limegreen;
}</style>
