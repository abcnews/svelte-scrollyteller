<script lang="ts">import { getContext, onMount } from 'svelte';
const vizDims = getContext('vizDims');
const isSplitScreen = getContext('isSplitScreen');
const isMobileRowMode = getContext('isMobileRowMode');
const screenDims = getContext('screenDims');
const steps = getContext('steps');
const currentPanel = getContext('currentPanel');
export let marker;
export let observerOptions;
export let isDebug;
export let vizMarkerThreshold = 20;
/**
 * The root margin amount, includes space either side.
 *
 * E.g. 20% margin = 0.6 multiplier (60% in the block, 2*20% outside = 100%)
 */
$: vizMarkerThresholdMarginDecimal = (100 - vizMarkerThreshold * 2) / 100;
/** Intersection observer root margin */
let rootMargin;
$: {
    if ($isMobileRowMode) {
        // For row layout on small portrait screens, block out space taken up by the viz at the top
        const threshold = ($vizDims.dims[1] / $screenDims[1]) * 100;
        // console.log($vizDims, $screenDims, threshold);
        rootMargin = `-${threshold}% 0px -30% 0px`;
    }
    else if ($isSplitScreen) {
        // For split screens, trigger the intersection observer when the block is
        // over {vizMarkerThreshold}% of the interactive.
        const threshold = Math.round(($screenDims[1] - ($vizDims.dims[1] || $screenDims[1]) * vizMarkerThresholdMarginDecimal) / 2);
        rootMargin = `-${threshold}px 0px -${threshold}px 0px`;
    }
    else {
        // Otherwise 10% of the screen height (on top and bottom).
        const threshold = Math.round($screenDims[1] / 8);
        rootMargin = `-${threshold}px 0px -${threshold}px 0px`;
    }
}
/**
 * When observerOptions isn't set, default to either 0.5 for centred blocks
 * or a 20% margin on the interactive.
 */
let _observerOptions;
$: {
    _observerOptions = {
        ...(observerOptions || {}),
        rootMargin,
    };
}
// Set up observer for panel position ======================================
let panelObserver;
/**
 * Track intersecting panels. We can change the viz back to the last panel
 * which we otherwise can't do if there are 2 panels overlapping at once.
 */
let intersectingPanels = [];
$: {
    if ($vizDims.status === 'ready') {
        intersectingPanels = [];
        panelObserver?.disconnect();
        panelObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    intersectingPanels.push(entry);
                }
                else {
                    const itemToRemove = intersectingPanels.findIndex((panel) => panel.target === entry.target);
                    if (itemToRemove === -1)
                        return;
                    intersectingPanels.splice(itemToRemove, 1);
                }
                // The current panel is the most recently intersected panel.
                // If the most recent panel scrolls out, this falls back to
                // any earlier panels that are still intersecting.
                const newPanel = intersectingPanels[intersectingPanels.length - 1];
                if (newPanel) {
                    marker = newPanel.target.scrollyData;
                    $currentPanel = $steps.findIndex((step) => step === newPanel.target);
                }
            });
        }, _observerOptions);
        $steps.forEach((step) => {
            panelObserver.observe(step);
        });
    }
    else {
        panelObserver?.disconnect();
    }
}
onMount(() => panelObserver?.disconnect());
</script>

{#if isDebug && rootMargin && !observerOptions}
	<div
		class="panelobserver-debug"
		style:top={rootMargin + 'px'}
		style:height={innerHeight - rootMargin * 2 + 'px'}
	></div>
{/if}

<style>.panelobserver-debug {
  position: sticky;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 255, 47, 0.4);
  border-style: solid none solid;
  z-index: 0;
}</style>
