/**
 * @file
 * Measures and derives panel positions and sizes based on scrollyteller mode.
 */
import { getContext, setContext } from "svelte";
import { MediaQuery } from "svelte/reactivity";
import { innerHeight } from "svelte/reactivity/window";
import type { Dims, Style } from "../types.js";

export interface LayoutManagerOptions {
  get containerWidth(): number;
  get graphicRootDims(): Dims;
  get layout(): Style;
  get ratio(): number;
}

export interface LayoutContext {
  align: "centre" | "left" | "right" | "none" | string;
  mobileVariant: "blocks" | "rows";
  resizeInteractive: boolean;
  transparentFloat: boolean;
  isSplitScreen: boolean;
  screenWidth: number;
  screenHeight: number;
  scrollytellerWidthPx: number;
  graphicWidthPx: number;
  panelMaxWidthPx: number;
  marginOuterPx: number;
  vizMarginOuterPx: number;
  isDebug: boolean;
}

const LAYOUT_KEY = Symbol("scrollyteller-layout");

/**
 * Custom Svelte 5 hook that manages reactive layout calculations and context registration.
 */
export function useLayoutManager(
  options: LayoutManagerOptions,
): () => LayoutContext {
  const align = $derived(options.layout.align || "centre");
  const mobileVariant = $derived(options.layout.mobileVariant || "blocks");
  const resizeInteractive = $derived(options.layout.resizeInteractive ?? true);
  const ratio = $derived(options.ratio ?? 1);

  const containerWidth = $derived(options.containerWidth || 1200);

  const isTablet = $derived(new MediaQuery("(min-width: 744px)").current);
  const isLargeTablet = $derived(new MediaQuery("(min-width: 992px)").current);
  const isDesktop = $derived(new MediaQuery("(min-width: 1200px)").current);
  const isLargeDesktop = $derived(
    new MediaQuery("(min-width: 1440px)").current,
  );
  const isMobile = $derived(!isLargeTablet);

  const layoutMetrics = $derived.by(() => {
    const isSplitScreen = ["left", "right"].includes(align) && !isMobile;
    const transparentFloat = options.layout.transparentFloat ?? isSplitScreen;

    // 1. Mobile Rows Variant (viz on top, text rows below)
    if (mobileVariant === "rows" && isMobile) {
      return {
        marginOuterPx: 0,
        vizMarginOuterPx: 0,
        scrollytellerWidthPx: containerWidth,
        graphicWidthPx: containerWidth,
        panelMaxWidthPx: 640,
        isSplitScreen: false,
        transparentFloat,
      };
    }

    // Outer margins & net container width for desktop/tablet
    const marginOuterPx = isLargeDesktop
      ? 64
      : isDesktop
        ? 48
        : isTablet
          ? 32
          : 16;
    const vizMarginOuterPx = isLargeDesktop
      ? 96
      : isDesktop
        ? 64
        : isTablet
          ? 48
          : 24;
    const maxBound = isLargeDesktop ? 1600 : containerWidth;
    const scrollytellerWidthPx = Math.max(
      0,
      Math.min(containerWidth, maxBound) - marginOuterPx * 2,
    );

    // 2. Centre / Standard Single Column Mode (non-split layout)
    if (!isSplitScreen) {
      return {
        marginOuterPx,
        vizMarginOuterPx,
        scrollytellerWidthPx,
        graphicWidthPx: scrollytellerWidthPx,
        panelMaxWidthPx: isLargeDesktop ? 720 : 640,
        isSplitScreen: false,
        transparentFloat,
      };
    }

    // 3. Desktop Left/Right Split-Screen Mode
    const [, columnHeight] = options.graphicRootDims.dims;
    const vizMaxWidthMultiplier = isDesktop ? 0.6 : 0.55;
    const columnWidth = scrollytellerWidthPx * vizMaxWidthMultiplier;
    const widthBasedOnHeight = columnHeight
      ? columnHeight * ratio
      : columnWidth;
    const graphicWidthPx = Math.min(
      widthBasedOnHeight || columnWidth,
      columnWidth,
    );

    const defaultMax = isLargeDesktop ? 720 : 640;
    const availableSpace =
      scrollytellerWidthPx - graphicWidthPx - vizMarginOuterPx;
    const panelMaxWidthPx = Math.max(280, Math.min(defaultMax, availableSpace));

    return {
      marginOuterPx,
      vizMarginOuterPx,
      scrollytellerWidthPx,
      graphicWidthPx,
      panelMaxWidthPx,
      isSplitScreen: true,
      transparentFloat,
    };
  });

  const isDebug = $derived(
    typeof location !== "undefined" && location.hash === "#debug=true",
  );

  const layoutState = $derived<LayoutContext>({
    align,
    mobileVariant,
    resizeInteractive,
    transparentFloat: layoutMetrics.transparentFloat,
    isSplitScreen: layoutMetrics.isSplitScreen,
    screenWidth: containerWidth,
    screenHeight: innerHeight.current || 0,
    scrollytellerWidthPx: layoutMetrics.scrollytellerWidthPx,
    graphicWidthPx: layoutMetrics.graphicWidthPx,
    panelMaxWidthPx: layoutMetrics.panelMaxWidthPx,
    marginOuterPx: layoutMetrics.marginOuterPx,
    vizMarginOuterPx: layoutMetrics.vizMarginOuterPx,
    isDebug,
  });

  const getLayoutState = () => layoutState;
  setContext(LAYOUT_KEY, getLayoutState);
  return getLayoutState;
}

/**
 * Retrieves the layout context getter in child components.
 */
export function getLayoutContext(): () => LayoutContext {
  return getContext<() => LayoutContext>(LAYOUT_KEY);
}
