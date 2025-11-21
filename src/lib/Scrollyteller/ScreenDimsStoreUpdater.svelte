<script lang="ts">
  import { getContext } from "svelte";

  const globalAlign = getContext("globalAlign");
  const screenDims = getContext("screenDims");
  const globalMobileVariant = getContext("mobileVariant");

  export let align = "centre";
  export let mobileVariant = "blocks";
  let innerWidth = 0;
  let innerHeight = 0;

  $: $screenDims = [innerWidth, innerHeight];
  $: $globalAlign = align;
  $: $globalMobileVariant = mobileVariant;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
