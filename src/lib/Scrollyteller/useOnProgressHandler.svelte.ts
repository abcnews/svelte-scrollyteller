interface OnProgressHandlerProps {
  get scrollytellerRef(): HTMLElement | undefined;
  get onProgress(): ((type: string, payload: any) => void) | undefined | null;
}

export function useOnProgressHandler(props: OnProgressHandlerProps) {
  $effect(() => {
    if (!props.onProgress) return;
    
    const scrollHandler = () => {
      const ref = props.scrollytellerRef;
      if (!ref) return;
      
      const rootRect = ref.getBoundingClientRect();

      props.onProgress?.("progress", {
        boundingRect: rootRect,
        rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
        scrollPct:
          1 -
          (rootRect.bottom - window.innerHeight) /
            (rootRect.height - window.innerHeight),
      });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });
}
