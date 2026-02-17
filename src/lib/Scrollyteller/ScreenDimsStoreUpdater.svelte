<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";

  const globalAlign = getContext<Writable<string>>("globalAlign");
  const screenDims = getContext<Writable<number[]>>("screenDims");
  const globalMobileVariant = getContext<Writable<string>>("mobileVariant");

  interface Props {
    align?: string;
    mobileVariant?: string;
  }

  let { align = "centre", mobileVariant = "blocks" }: Props = $props();

  $effect(() => {
    $globalAlign = align;
  });
  $effect(() => {
    $globalMobileVariant = mobileVariant;
  });

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Using requestAnimationFrame to ensure the store update happens
        // in the next frame, avoiding layout thrashing.
        requestAnimationFrame(() => {
          $screenDims = [width, height];
        });
      }
    });

    observer.observe(document.documentElement);

    return () => observer.disconnect();
  });
</script>
