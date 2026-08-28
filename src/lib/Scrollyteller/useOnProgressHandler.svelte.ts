interface OnProgressHandlerProps {
  get scrollytellerRef(): HTMLElement | undefined;
  get onProgress(): ((type: string, payload: any) => void) | undefined | null;
}

/**
 * Emits onProgress events for consumption outside the scrollyteller.
 *
 * To avoid layout thrashing and scroll jank, dimensions and document-relative
 * offsets are measured only on initialisation and element/window resize.
 * Scroll progress and bounding rects are derived from scroll offsets during scroll.
 */
export function useOnProgressHandler(props: OnProgressHandlerProps) {
  $effect(() => {
    const onProgress = props.onProgress;
    const ref = props.scrollytellerRef;
    if (!onProgress || !ref) return;

    let scrollytellerTop = 0;
    let scrollytellerLeft = 0;
    let width = 0;
    let height = 0;
    let windowHeight = window.innerHeight;

    /**
     * Measures element bounding rect and records positions relative to document.
     */
    const measureDimensions = () => {
      const rect = ref.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      scrollytellerTop = rect.top + scrollY;
      scrollytellerLeft = rect.left + scrollX;
      width = rect.width;
      height = rect.height;
      windowHeight = window.innerHeight;
    };

    /**
     * Derives bounding rect and progress percentages purely from scroll offsets.
     */
    const emitProgress = () => {
      const scrollY = window.scrollY;
      const top = scrollytellerTop - scrollY;
      const bottom = top + height;

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
    };

    const handleResize = () => {
      measureDimensions();
      emitProgress();
    };

    // Initial measurement
    measureDimensions();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref);

    window.addEventListener("scroll", emitProgress, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", emitProgress);
      window.removeEventListener("resize", handleResize);
    };
  });
}
