<script lang="ts">
  import { retryUntil } from "./Scrollyteller/Scrollyteller.util.js";
  import { getLayoutContext } from "./Scrollyteller/useLayoutManager.svelte.js";
  import type { Style, Dims } from "./types.js";

  interface Props {
    layout?: Style;
    onLoad?: (el: HTMLElement | undefined) => void;
    vizDims?: Dims;
    graphicRootDims?: Dims;
    vizEl?: HTMLElement;
    children?: import("svelte").Snippet;
  }

  let {
    layout,
    onLoad = () => {},
    vizDims = $bindable({ status: "loading", dims: [0, 0] }),
    graphicRootDims = $bindable({ status: "loading", dims: [0, 0] }),
    vizEl = $bindable(),
    children,
  }: Props = $props();

  const layoutCtx = $derived(getLayoutContext()?.());

  // emit an event with the viz root, because the web component doesn't
  // support slots & must insert content  manually.
  let graphicRootEl = $state<HTMLElement>();
  $effect(() => {
    vizEl = graphicRootEl;
    if (graphicRootEl) {
      onLoad(graphicRootEl);
    }
  });

  $effect(() => {
    if (!graphicRootEl) return;

    const observer = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.target === graphicRootEl) {
            graphicRootDims = {
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height],
            };
          } else {
            vizDims = {
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height],
            };
          }
        });
      });
    });

    retryUntil(() => graphicRootEl).then(() => {
      if (!graphicRootEl) {
        return;
      }
      observer.observe(graphicRootEl);
    });

    // wait for the viz to be inserted
    retryUntil(() => graphicRootEl?.children?.length).then(() => {
      const child = graphicRootEl?.children[0];
      if (child) observer.observe(child);
    });

    return () => {
      observer.disconnect();
    };
  });
</script>

<div
  class="viz"
  class:viz--resized={layoutCtx?.resizeInteractive}
  class:viz--mobile-rows={layoutCtx?.mobileVariant === "rows"}
  class:viz--right={layoutCtx?.resizeInteractive && layoutCtx?.align === "left"}
  class:viz--left={layoutCtx?.resizeInteractive && layoutCtx?.align === "right"}
  class:viz--centre={layoutCtx?.resizeInteractive && layoutCtx?.align === "centre"}
  style:width={layoutCtx?.isSplitScreen && layoutCtx?.resizeInteractive ? `${layoutCtx.graphicWidthPx}px` : undefined}
  bind:this={graphicRootEl}
>
  {@render children?.()}
</div>

<style lang="scss">
  @use "./breakpoints.scss" as breakpoints;

  @media (max-width: breakpoints.$breakpointLargeTablet) {
    .viz--mobile-rows.viz--resized {
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

  .viz {
    transform: translate3d(0, 0, 0);
    height: 100dvh;
    position: sticky;
    top: 0;
    z-index: 1;
    max-width: 100%;
    box-sizing: border-box;
  }

  .viz--resized {
    container-type: size;
    height: 60dvh;
    top: 10dvh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    @media (min-width: breakpoints.$breakpointTablet) {
      top: 8dvh;
      height: 62dvh;
    }

    &.viz--left,
    &.viz--right {
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
