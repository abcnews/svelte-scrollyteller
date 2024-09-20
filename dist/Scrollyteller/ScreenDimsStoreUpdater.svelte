<script>import { globalAlign, isSplitScreen, screenDims } from '../stores';
export let align = 'centre';
let innerWidth = 0;
let innerHeight = 0;
$: $screenDims = [innerWidth, innerHeight];
$: $globalAlign = align;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
