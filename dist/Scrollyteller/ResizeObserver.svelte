<script>import { margin } from '../stores';
import { onMount } from 'svelte';
export let scrollytellerRef;
function onResize() {
    if (!scrollytellerRef)
        return;
    // Get the margin in rems
    const marginOuter = getComputedStyle(scrollytellerRef).getPropertyValue('--marginOuter');
    const parsedMarginRems = parseInt(marginOuter, 10);
    // Get the root font size, this is what 1rem is.
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // Conmvert the margin to pixels we can use in JS.
    const pixelMargin = parsedMarginRems * rootFontSize;
    // FIXME: possibly unused
    $margin = pixelMargin;
}
$: {
    if (scrollytellerRef) {
        onResize();
    }
}
</script>

<svelte:window on:resize={onResize} />
