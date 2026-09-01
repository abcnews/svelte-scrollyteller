import type { PanelRef } from "../types.js";

interface ScrollManagerProps {
  /** Reference to the root scrollyteller element */
  get scrollytellerRef(): HTMLElement | undefined;
  /** Reference to the sticky viz graphic element */
  get vizEl(): HTMLElement | undefined;
  /** Array of DOM references for each panel step */
  get steps(): PanelRef[];
  /** Percentage from the bottom of the screen to trigger panels (default: 20) */
  get vizMarkerThreshold(): number;
  /** Setter for clamped active panel index (0 to N-1) */
  set currentPanel(index: number);
  /** Setter for raw lifecycle panel index (-1 for prelude, 0..N-1 for panels, N for outro) */
  set virtualPanel(index: number);
  /** Setter for progress percentage through current panel */
  set panelPct(pct: number);
  /** Setter for overall scroll percentage */
  set scrollPct(pct: number);
  /** Setter for viewport coverage percentage */
  set rootPct(pct: number);
}

/**
 * Manages scroll-driven panel triggering and progress reporting using passive event handlers.
 */
export function useScrollManager(props: ScrollManagerProps) {
  $effect(() => {
    const scrollytellerRef = props.scrollytellerRef;
    const vizEl = props.vizEl;
    const steps = props.steps;
    const vizMarkerThreshold = props.vizMarkerThreshold ?? 20;

    if (!scrollytellerRef || !vizEl) return;

    let preludeStart = 0;
    let triggers: number[] = [];
    let scrollytellerTop = 0;
    let height = 0;
    let windowHeight = window.innerHeight;
    let unpinScroll = 0;

    /**
     * Measures element bounding rectangles and constructs trigger scroll positions.
     */
    const measureDimensions = () => {
      const scrollY = window.scrollY;
      const rect = scrollytellerRef.getBoundingClientRect();
      const vizRect = vizEl.getBoundingClientRect();
      const wrapperEl = scrollytellerRef.parentElement || scrollytellerRef;
      const wrapperRect = wrapperEl.getBoundingClientRect();

      windowHeight = window.innerHeight;
      height = rect.height;
      scrollytellerTop = rect.top + scrollY;

      const wrapperTop = wrapperRect.top + scrollY;
      const vizStickyTop = parseFloat(window.getComputedStyle(vizEl).top) || 0;
      const vizHeight = vizRect.height || windowHeight;
      const triggerLine = windowHeight * (1 - vizMarkerThreshold / 100);

      preludeStart = wrapperTop - windowHeight;
      unpinScroll = scrollytellerTop + height - (vizStickyTop + vizHeight);

      // Measure trigger scroll position for each panel step
      triggers = steps.map((step) =>
        step
          ? step.getBoundingClientRect().top + scrollY - triggerLine
          : scrollytellerTop
      );
    };

    /**
     * Calculates scroll progress and updates active panel state.
     */
    const handleScroll = () => {
      if (triggers.length === 0) return;

      const scrollY = window.scrollY;
      const totalScrollDistance = Math.max(1, unpinScroll - triggers[0]);
      const bottom = scrollytellerTop - scrollY + height;

      // Viewport coverage progress
      props.rootPct = 1 - bottom / (height + windowHeight);

      // 1. Prelude (starts at 0% when wrapper enters bottom of viewport)
      if (scrollY < triggers[0]) {
        const preludeSpan = Math.max(1, triggers[0] - preludeStart);
        props.virtualPanel = -1;
        props.currentPanel = 0;
        props.panelPct = Math.min(1, Math.max(0, (scrollY - preludeStart) / preludeSpan));
        props.scrollPct = Number(((scrollY - triggers[0]) / totalScrollDistance).toFixed(4));
        return;
      }

      // 2. Outro (after graphic unpins from bottom of container)
      if (scrollY >= unpinScroll) {
        const outroEnd = scrollytellerTop + height;
        const outroSpan = Math.max(1, outroEnd - unpinScroll);
        props.virtualPanel = steps.length;
        props.currentPanel = Math.max(0, steps.length - 1);
        props.panelPct = Math.min(1, Math.max(0, (scrollY - unpinScroll) / outroSpan));
        props.scrollPct = 1;
        return;
      }

      // 3. Active panel (0 to N-1)
      const activeIndex = triggers.findLastIndex((t) => scrollY >= t);
      const nextTrigger =
        activeIndex < triggers.length - 1 ? triggers[activeIndex + 1] : unpinScroll;
      const span = Math.max(1, nextTrigger - triggers[activeIndex]);

      props.virtualPanel = activeIndex;
      props.currentPanel = Math.min(steps.length - 1, Math.max(0, activeIndex));
      props.panelPct = Math.min(1, Math.max(0, (scrollY - triggers[activeIndex]) / span));
      props.scrollPct = Number(
        Math.min(1, Math.max(0, (scrollY - triggers[0]) / totalScrollDistance)).toFixed(4)
      );
    };

    const handleResize = () => {
      measureDimensions();
      handleScroll();
    };

    measureDimensions();
    handleScroll();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(scrollytellerRef);
    resizeObserver.observe(vizEl);
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
