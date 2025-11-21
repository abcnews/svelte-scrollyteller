<script lang="ts">
  import type { WritableDims } from "$lib/types";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  const globalAlign = getContext<Writable<string>>("globalAlign");
  const screenDims = getContext<Writable<number[]>>("screenDims");
  const globalMobileVariant = getContext<Writable<string>>("mobileVariant");

  interface Props {
    align?: string;
    mobileVariant?: string;
  }

  let { align = "centre", mobileVariant = "blocks" }: Props = $props();
  let innerWidth = $state(0);
  let innerHeight = $state(0);

  $effect(() => {
    $screenDims = [innerWidth, innerHeight];
  });
  $effect(() => {
    $globalAlign = align;
  });
  $effect(() => {
    $globalMobileVariant = mobileVariant;
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />
