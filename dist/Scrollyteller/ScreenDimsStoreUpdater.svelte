<script lang="ts">import { getContext, onMount } from "svelte";
const globalAlign = getContext("globalAlign");
const screenDims = getContext("screenDims");
const globalMobileVariant = getContext("mobileVariant");
let { align = "centre", mobileVariant = "blocks" } = $props();
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
