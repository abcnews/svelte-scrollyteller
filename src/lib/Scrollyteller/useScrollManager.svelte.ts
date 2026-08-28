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

interface ScrollSegment {
  /** Panel index: -1 for prelude, 0..N-1 for panels, N for outro */
  index: number;
  /** Document scroll position (window.scrollY) where this segment begins */
  start: number;
}

/**
 * Manages scroll-driven panel triggering and progress reporting using passive event handlers.
 *
 * All lifecycle milestones (prelude, individual panels, and completion) are modelled
 * as a sequence of scroll segments calculated on load/resize.
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
    let segments: ScrollSegment[] = [];
    let activePanelIndex = -1;

    /**
     * Measures element bounding rectangles and constructs document-relative scroll segments.
     * This is a heavy op, so we do it once/when the size changes
     */
    const measureDimensions = () => {
      const scrollY = window.scrollY;
      const rect = ref.getBoundingClientRect();

      scrollytellerTop = rect.top + scrollY;
      height = rect.height;
      windowHeight = window.innerHeight;

      /** Graphic element inside the scrollyteller */
      const vizEl = ref.querySelector(".viz") as HTMLElement | null;

      /** CSS sticky top offset (e.g. 8dvh) where the graphic locks into place */
      const vizStickyTop = vizEl
        ? parseFloat(window.getComputedStyle(vizEl).top) || 0
        : 0;

      /** Rendered height of the sticky graphic element */
      const vizHeight = vizEl
        ? vizEl.getBoundingClientRect().height
        : windowHeight;

      /** Distance from the top of the viewport where panels activate */
      const triggerOffset = windowHeight * (1 - vizMarkerThreshold / 100);

      /** Document scroll position where the sticky graphic reaches the container bottom and unpins */
      const unpinScroll =
        scrollytellerTop + height - (vizStickyTop + vizHeight);

      // Construct flat array of all scroll boundaries
      segments = [
        // Virtual panel -1: Prelude starts when scrollyteller top enters the bottom of the viewport
        { index: -1, start: scrollytellerTop - windowHeight },

        // Panel 0: Starts when the graphic hits its sticky top position and locks
        { index: 0, start: scrollytellerTop - vizStickyTop },

        // Panels 1..N-1: Trigger when their top hits the viewport trigger line
        ...steps.slice(1).map((step, i) => ({
          index: i + 1,
          start: step
            ? step.getBoundingClientRect().top + scrollY - triggerOffset
            : scrollytellerTop,
        })),

        // Virtual panel N: Outro starts when the scrollyteller begins scrolling out
        { index: steps.length, start: unpinScroll },

        // End of outro: When the scrollyteller completely leaves the top of the viewport
        { index: steps.length + 1, start: scrollytellerTop + height },
      ];
    };

    /**
     * Calculates scroll progress and updates active panel index based on current scroll position.
     */
    const handleScroll = () => {
      if (segments.length < 2) return;

      const scrollY = window.scrollY;
      const bottom = scrollytellerTop - scrollY + height;

      // Find the active segment
      const activeSegmentIndex = segments.findLastIndex(
        (seg) => scrollY >= seg.start,
      );
      const currentIndex = Math.min(
        segments.length - 2,
        Math.max(0, activeSegmentIndex),
      );

      const currentSegment = segments[currentIndex];
      const nextSegment = segments[currentIndex + 1];

      // 1. Progress percentage through the active panel, prelude, or outro (0.0 -> 1.0)
      const span = Math.max(1, nextSegment.start - currentSegment.start);
      const panelPct = Math.min(
        1,
        Math.max(0, (scrollY - currentSegment.start) / span),
      );

      // 2. Overall scroll progress through the scrollyteller (unclamped: <0 before start, >1 after end)
      const scrollStart = segments[1].start;
      const scrollEnd = segments[segments.length - 2].start;
      const scrollableDistance = Math.max(1, scrollEnd - scrollStart);
      const scrollPct = (scrollY - scrollStart) / scrollableDistance;

      // 3. Viewport coverage progress (rootPct)
      const rootPct = 1 - bottom / (height + windowHeight);

      // 4. Update reactive panel index
      if (currentSegment.index !== activePanelIndex) {
        activePanelIndex = currentSegment.index;
        props.currentPanel = currentSegment.index;
      }

      // 5. Emit progress callback
      if (onProgress) {
        onProgress("progress", {
          rootPct,
          scrollPct: Number(scrollPct.toFixed(4)),
          panelPct,
          panelIndex: currentSegment.index,
        });
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
    const vizEl = ref.querySelector(".viz");
    if (vizEl) resizeObserver.observe(vizEl);
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
