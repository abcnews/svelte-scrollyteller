<script lang="ts">
  /**
   * @file
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
  import type { WritableDims, IntersectionEntries, PanelRef } from "$lib/types";
  import { getContext, onMount } from "svelte";
  import { run } from "svelte/legacy";
  import type { Writable } from "svelte/store";
  const vizDims = getContext<WritableDims>("vizDims");
  const isSplitScreen = getContext<Writable<boolean>>("isSplitScreen");
  const isMobileRowMode = getContext<Writable<boolean>>("isMobileRowMode");
  const screenDims = getContext<WritableDims>("screenDims");
  const steps = getContext<Writable<PanelRef[]>>("steps");
  const currentPanel = getContext<Writable<number>>("currentPanel");

  interface Props {
    marker: any;
    observerOptions: any;
    vizMarkerThreshold?: number;
  }

  let {
    marker = $bindable(),
    observerOptions,
    vizMarkerThreshold = 20,
  }: Props = $props();

  /**
   * The root margin amount, includes space either side.
   *
   * E.g. 20% margin = 0.6 multiplier (60% in the block, 2*20% outside = 100%)
   */
  let vizMarkerThresholdMarginDecimal = $derived(
    (100 - vizMarkerThreshold * 2) / 100
  );

  /** Intersection observer root margin */
  let rootMargin = $state<string>();
  $effect(() => {
    if ($isMobileRowMode) {
      // For row layout on small portrait screens, block out space taken up by the viz at the top
      const threshold = ($vizDims.dims[1] / $screenDims[1]) * 100;
      // console.log($vizDims, $screenDims, threshold);
      rootMargin = `-${threshold}% 0px -30% 0px`;
    } else if ($isSplitScreen) {
      // For split screens, trigger the intersection observer when the block is
      // over {vizMarkerThreshold}% of the interactive.
      const threshold = Math.round(
        ($screenDims[1] -
          ($vizDims.dims[1] || $screenDims[1]) *
            vizMarkerThresholdMarginDecimal) /
          2
      );
      rootMargin = `-${threshold}px 0px -${threshold}px 0px`;
    } else {
      // Otherwise 10% of the screen height (on top and bottom).
      const threshold = Math.round($screenDims[1] / 8);
      rootMargin = `-${threshold}px 0px -${threshold}px 0px`;
    }
  });

  /**
   * When observerOptions isn't set, default to either 0.5 for centred blocks
   * or a 20% margin on the interactive.
   */
  let _observerOptions: IntersectionObserverInit | undefined = $derived.by(
    () => ({
      ...(observerOptions || {}),
      rootMargin,
    })
  );

  // Set up observer for panel position ======================================
  /**
   * Track intersecting panels. We can change the viz back to the last panel
   * which we otherwise can't do if there are 2 panels overlapping at once.
   */
  let intersectingPanels = $state([]);

  $effect(() => {
    if ($vizDims.status !== "ready" || !$steps.length) {
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
              (panel) => panel.target !== entry.target
            );
          }

          // The current panel is the most recently intersected panel.
          // If the most recent panel scrolls out, this falls back to
          // any earlier panels that are still intersecting.
          const newPanel = intersectingPanels[intersectingPanels.length - 1];
          if (newPanel) {
            marker = newPanel.target.scrollyData;
            $currentPanel = $steps.findIndex(
              (step) => step === newPanel.target
            );
          }
        });
      },
      _observerOptions
    );
    $steps.forEach((step) => {
      panelObserver.observe(step);
    });
    return () => {
      panelObserver?.disconnect();
    };
  });
</script>

<style lang="scss">
  .panelobserver-debug {
    position: sticky;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 255, 47, 0.4);
    border-style: solid none solid;
    z-index: 0;
  }
</style>
