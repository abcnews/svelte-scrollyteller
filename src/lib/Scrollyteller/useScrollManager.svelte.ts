import type { PanelRef } from "../types.js";

interface ScrollManagerProps {
  /** Reference to the root scrollyteller element */
  get scrollytellerRef(): HTMLElement | undefined;
  /** Array of DOM references for each panel step */
  get steps(): PanelRef[];
  /** Percentage from the bottom of the screen to trigger panels (default: 20) */
  get vizMarkerThreshold(): number;
  /** Callback for scroll progress updates */
  get onProgress(): ((type: string, payload: any) => void) | undefined | null;
  /** Setter for current active panel index */
  set currentPanel(index: number);
}

/**
 * Manages scroll-driven panel triggering and progress reporting using passive event handlers.
 *
 * Positions and dimensions are pre-calculated relative to the document on initialisation
 * and resize, eliminating layout thrashing and scroll jank. During scrolling, active
 * panels and progress percentages are derived purely from `window.scrollY`.
 */
export function useScrollManager(props: ScrollManagerProps) {
  $effect(() => {
    const ref = props.scrollytellerRef;
    const steps = props.steps;
    const vizMarkerThreshold = props.vizMarkerThreshold ?? 20;
    const onProgress = props.onProgress;

    if (!ref) return;

    let scrollytellerTop = 0;
    let height = 0;
    let windowHeight = window.innerHeight;
    let panelTops: number[] = [];
    let activePanelIndex = -1;

    /**
     * Measures element bounding rectangles and records document-relative positions.
     */
    const measureDimensions = () => {
      const scrollY = window.scrollY;
      const rect = ref.getBoundingClientRect();

      scrollytellerTop = rect.top + scrollY;
      height = rect.height;
      windowHeight = window.innerHeight;

      panelTops = steps.map((step) => {
        if (!step) return 0;
        return step.getBoundingClientRect().top + scrollY;
      });
    };

    /**
     * Calculates scroll progress and updates active panel index based on current scroll position.
     */
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const top = scrollytellerTop - scrollY;
      const bottom = top + height;

      // 1. Calculate and emit progress
      if (onProgress) {
        const totalScrollableDistance = height - windowHeight;
        const rootPct = 1 - bottom / (height + windowHeight);
        const scrollPct =
          totalScrollableDistance === 0
            ? 1
            : 1 - (bottom - windowHeight) / totalScrollableDistance;

        onProgress("progress", {
          rootPct,
          scrollPct,
        });
      }

      // 2. Trigger active panel using an index cursor starting from the current panel
      if (panelTops.length > 0) {
        const triggerOffsetFromTop =
          windowHeight * (1 - vizMarkerThreshold / 100);
        const triggerY = scrollY + triggerOffsetFromTop;

        let nextIndex = Math.max(0, activePanelIndex);

        // Advance pointer forward when scrolling down past subsequent panels
        while (
          nextIndex + 1 < panelTops.length &&
          triggerY >= panelTops[nextIndex + 1]
        ) {
          nextIndex += 1;
        }

        // Retreat pointer backwards when scrolling up above current panel
        while (nextIndex > 0 && triggerY < panelTops[nextIndex]) {
          nextIndex -= 1;
        }

        if (nextIndex !== activePanelIndex) {
          activePanelIndex = nextIndex;
          props.currentPanel = nextIndex;
        }
      }
    };

    const handleResize = () => {
      measureDimensions();
      handleScroll();
    };

    // Initial measurement and immediate calculation
    measureDimensions();
    handleScroll();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref);
    steps.forEach((step) => {
      if (step) resizeObserver.observe(step);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  });
}
