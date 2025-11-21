<script lang="ts">
  import GraphicObserver from "./Scrollyteller/GraphicObserver.svelte";
  import type { Style } from "./types";

  interface Props {
    layout: Style;
    discardSlot?: boolean;
    isInViewport?: boolean;
    onLoad?: (HTMLElement) => void;
    children?: import("svelte").Snippet;
  }

  let {
    layout,
    discardSlot = false,
    isInViewport = false,
    onLoad = () => {},
    children,
  }: Props = $props();

  // emit an event with the viz root, because the web component doesn't
  // support slots & must insert content  manually.
  let graphicRootEl = $state<HTMLElement>();
  $effect(() => {
    if (graphicRootEl) {
      onLoad(graphicRootEl);
    }
  });
</script>

<GraphicObserver {graphicRootEl} />

<div
  class="viz"
  class:viz--resized={layout.resizeInteractive}
  class:viz--right={layout.resizeInteractive && layout.align === "left"}
  class:viz--left={layout.resizeInteractive && layout.align === "right"}
  class:viz--centre={layout.resizeInteractive && layout.align === "centre"}
  bind:this={graphicRootEl}
>
  {#if isInViewport || discardSlot === false}
    {@render children?.()}
  {/if}
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;

  :global(.scrollyteller--mobile-row-variant) {
    --marginOuter: 0;
    --vizMarginOuter: 0;

    @media (max-width: breakpoints.$breakpointLargeTablet) {
      .viz--resized {
        z-index: 10;
        top: 0;
        margin: 0;
        background: white;
        width: 100% !important;
        max-height: calc(45vh + 50px);
        aspect-ratio: 1;
        container-type: normal;
        padding-bottom: 40px;
        background: linear-gradient(to bottom, white 90%, transparent 100%);
      }
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
    width: calc(100% - calc(var(--marginOuter) * 2));
    max-width: calc(100vw - var(--vizMarginOuter) * 2);
    @media (min-width: breakpoints.$breakpointTablet) {
      --margin: 4rem;
      top: 8dvh;
      height: 62dvh;
    }

    &.viz--left,
    &.viz--right {
      width: var(--rightColumnWidth);
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        align-items: center;
        height: 84dvh;
        top: 8dvh;
      }
      @media (min-width: breakpoints.$breakpointDesktop) {
        height: 76dvh;
        top: 12dvh;
      }
      @media (min-width: breakpoints.$breakpointLargeDesktop) {
        top: 10dvh;
        height: 80dvh;
      }
    }
    &.viz--left {
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        margin: 0 auto 0 0;
      }
    }
    &.viz--right {
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        margin: 0 0 0 auto;
      }
    }
    &.viz--centre {
      @media (min-width: breakpoints.$breakpointLargeTablet) {
        top: 8dvh;
        height: 62dvh;
      }
      @media (min-width: breakpoints.$breakpointDesktop) {
        top: 12dvh;
        height: 58dvh;
      }
      @media (min-width: breakpoints.$breakpointLargeDesktop) {
        top: 12dvh;
        height: 58dvh;
      }
    }
    :global(.scrollyteller--debug) & {
      outline: 5px solid limegreen;
    }
  }
</style>
