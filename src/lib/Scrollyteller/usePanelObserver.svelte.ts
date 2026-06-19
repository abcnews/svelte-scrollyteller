import type { Dims, IntersectionEntries, PanelRef } from "../types.js";

interface PanelObserverProps {
  get observerOptions(): IntersectionObserverInit | undefined;
  get vizMarkerThreshold(): number;
  get vizDims(): Dims;
  get isSplitScreen(): boolean;
  get isMobileRowMode(): boolean;
  get screenDims(): [number, number];
  get steps(): PanelRef[];
  set currentPanel(v: number);
}

/**
 * Handles intersection observers for panels/markers.
 *
 * The default observer options for centred panels is { threshold: 0.5 }
 *
 * The default observer options for left/right aligned panels works
 * such that blocks only trigger when they've scrolled past at least 20% of
 * the viz.
 *
 * As a result, we need to:
 * 1. Wait for vizDims to become availble
 * 2. calculate the rootMargin for the panel observer based on the box size.
 * 3. finally, observe the panels.
 *
 * Because left/right aligned panels are closer together than centred panels
 * we must track intersecting panels in `intersectingPanels`, otherwise
 * scrolling back up the page doesn't work as expected.
 */
export function usePanelObserver(props: PanelObserverProps) {

  /**
   * The root margin amount, includes space either side.
   *
   * E.g. 20% margin = 0.6 multiplier (60% in the block, 2*20% outside = 100%)
   */
  let vizMarkerThresholdMarginDecimal = $derived(
    (100 - props.vizMarkerThreshold * 2) / 100,
  );

  /** Intersection observer root margin */
  let rootMargin = $derived.by(() => {
    if (props.isMobileRowMode) {
      // For row layout on small portrait screens, block out space taken up by the viz at the top
      const threshold = (props.vizDims.dims[1] / props.screenDims[1]) * 100;
      return `-${threshold}% 0px -30% 0px`;
    } else if (props.isSplitScreen) {
      // For split screens, trigger the intersection observer when the block is
      // over {vizMarkerThreshold}% of the interactive.
      const threshold = Math.round(
        (props.screenDims[1] -
          (props.vizDims.dims[1] || props.screenDims[1]) *
            vizMarkerThresholdMarginDecimal) /
          2,
      );
      return `-${threshold}px 0px -${threshold}px 0px`;
    } else {
      // Otherwise 10% of the screen height (on top and bottom).
      const threshold = Math.round(props.screenDims[1] / 8);
      return `-${threshold}px 0px -${threshold}px 0px`;
    }
  });

  /**
   * When observerOptions isn't set, default to either 0.5 for centred blocks
   * or a 20% margin on the interactive.
   */
  let _observerOptions: IntersectionObserverInit | undefined = $derived.by(
    () => ({
      ...(props.observerOptions || {}),
      rootMargin,
    }),
  );

  // Set up observer for panel position

  /**
   * Track intersecting panels. We can change the viz back to the last panel
   * which we otherwise can't do if there are 2 panels overlapping at once.
   */
  let intersectingPanels = $state<IntersectionEntries[]>([]);

  $effect(() => {
    if (props.vizDims.status !== "ready" || !props.steps.length) {
      return;
    }
    intersectingPanels = [];

    const panelObserver = new IntersectionObserver(
      (entries: IntersectionEntries[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingPanels = [...intersectingPanels, entry];
          } else {
            intersectingPanels = intersectingPanels.filter(
              (panel) => panel.target !== entry.target,
            );
          }

          // The current panel is the most recently intersected panel.
          // If the most recent panel scrolls out, this falls back to
          // any earlier panels that are still intersecting.
          const newPanel = intersectingPanels[intersectingPanels.length - 1];
          if (newPanel) {
            props.currentPanel = props.steps.findIndex((step) => step === newPanel.target);
          }
        });
      },
      _observerOptions,
    );
    props.steps.forEach((step) => {
      panelObserver.observe(step);
    });
    return () => {
      panelObserver.disconnect();
    };
  });
}
