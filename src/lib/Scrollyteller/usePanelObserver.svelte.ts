import type { WritableDims, IntersectionEntries, PanelRef } from "../types.js";
import { getContext } from "svelte";
import type { Writable, Readable } from "svelte/store";

interface PanelObserverProps {
  get marker(): any;
  set marker(v: any);
  get observerOptions(): IntersectionObserverInit | undefined;
  get vizMarkerThreshold(): number;
}

function fromStore<T>(store: Readable<T>, initialValue: T) {
  let value = $state<T>(initialValue);
  $effect(() =>
    store.subscribe((v) => {
      value = v;
    }),
  );
  return {
    get value() {
      return value;
    },
  };
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
  const vizDimsStore = getContext<WritableDims>("vizDims");
  const isSplitScreenStore = getContext<Writable<boolean>>("isSplitScreen");
  const isMobileRowModeStore = getContext<Writable<boolean>>("isMobileRowMode");
  const screenDimsStore = getContext<WritableDims>("screenDims");
  const stepsStore = getContext<Writable<PanelRef[]>>("steps");
  const currentPanelStore = getContext<Writable<number>>("currentPanel");

  const vizDims = fromStore(vizDimsStore, { status: "loading", dims: [0, 0] });
  const isSplitScreen = fromStore(isSplitScreenStore, false);
  const isMobileRowMode = fromStore(isMobileRowModeStore, false);
  const screenDims = fromStore(screenDimsStore, [0, 0]);
  const steps = fromStore(stepsStore, []);

  let vizMarkerThresholdMarginDecimal = $derived(
    (100 - props.vizMarkerThreshold * 2) / 100,
  );

  let rootMargin = $derived.by(() => {
    if (isMobileRowMode.value) {
      const threshold = (vizDims.value.dims[1] / screenDims.value[1]) * 100;
      return `-${threshold}% 0px -30% 0px`;
    } else if (isSplitScreen.value) {
      const threshold = Math.round(
        (screenDims.value[1] -
          (vizDims.value.dims[1] || screenDims.value[1]) *
            vizMarkerThresholdMarginDecimal) /
          2,
      );
      return `-${threshold}px 0px -${threshold}px 0px`;
    } else {
      const threshold = Math.round(screenDims.value[1] / 8);
      return `-${threshold}px 0px -${threshold}px 0px`;
    }
  });

  let _observerOptions: IntersectionObserverInit | undefined = $derived.by(
    () => ({
      ...(props.observerOptions || {}),
      rootMargin,
    }),
  );

  let intersectingPanels = $state<IntersectionEntries[]>([]);

  $effect(() => {
    if (vizDims.value.status !== "ready" || !steps.value.length) {
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

          const newPanel = intersectingPanels[intersectingPanels.length - 1];
          if (newPanel) {
            props.marker = newPanel.target.scrollyData;
            currentPanelStore.set(
              steps.value.findIndex((step) => step === newPanel.target),
            );
          }
        });
      },
      _observerOptions,
    );
    steps.value.forEach((step) => {
      panelObserver.observe(step);
    });
    return () => {
      panelObserver.disconnect();
    };
  });
}
