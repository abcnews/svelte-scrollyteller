import { getContext } from "svelte";
import { retryUntil } from "./Scrollyteller.util.js";
import type { WritableDims } from "../types.js";

interface GraphicObserverProps {
  get graphicRootEl(): HTMLElement | undefined;
}

export function useGraphicObserver(props: GraphicObserverProps) {
  const vizDims = getContext<WritableDims>("vizDims");
  const graphicRootDims = getContext<WritableDims>("graphicRootDims");

  $effect(() => {
    const graphicRootEl = props.graphicRootEl;
    if (!graphicRootEl) return;

    const observer = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          if (entry.target === graphicRootEl) {
            graphicRootDims.set({
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height],
            });
          } else {
            vizDims.set({
              status: "ready",
              dims: [entry.contentRect.width, entry.contentRect.height],
            });
          }
        });
      });
    });

    retryUntil(() => props.graphicRootEl).then(() => {
      observer.observe(graphicRootEl);
    });

    // wait for the viz to be inserted
    retryUntil(() => props.graphicRootEl?.children?.length).then(() => {
      const child = graphicRootEl.children[0];
      if (child) observer.observe(child);
    });

    return () => {
      observer.disconnect();
    };
  });
}
