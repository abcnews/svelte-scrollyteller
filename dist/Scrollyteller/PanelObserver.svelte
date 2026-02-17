<script lang="ts">import { getContext } from "svelte";
const vizDims = getContext("vizDims");
const isSplitScreen = getContext("isSplitScreen");
const isMobileRowMode = getContext("isMobileRowMode");
const screenDims = getContext("screenDims");
const steps = getContext("steps");
const currentPanel = getContext("currentPanel");
let { marker = $bindable(), observerOptions, vizMarkerThreshold = 20, } = $props();
/**
 * The root margin amount, includes space either side.
 *
 * E.g. 20% margin = 0.6 multiplier (60% in the block, 2*20% outside = 100%)
 */
let vizMarkerThresholdMarginDecimal = $derived((100 - vizMarkerThreshold * 2) / 100);
/** Intersection observer root margin */
let rootMargin = $derived.by(() => {
    if ($isMobileRowMode) {
        // For row layout on small portrait screens, block out space taken up by the viz at the top
        const threshold = ($vizDims.dims[1] / $screenDims[1]) * 100;
        // console.log($vizDims, $screenDims, threshold);
        return `-${threshold}% 0px -30% 0px`;
    }
    else if ($isSplitScreen) {
        // For split screens, trigger the intersection observer when the block is
        // over {vizMarkerThreshold}% of the interactive.
        const threshold = Math.round(($screenDims[1] -
            ($vizDims.dims[1] || $screenDims[1]) *
                vizMarkerThresholdMarginDecimal) /
            2);
        return `-${threshold}px 0px -${threshold}px 0px`;
    }
    else {
        // Otherwise 10% of the screen height (on top and bottom).
        const threshold = Math.round($screenDims[1] / 8);
        return `-${threshold}px 0px -${threshold}px 0px`;
    }
});
/**
 * When observerOptions isn't set, default to either 0.5 for centred blocks
 * or a 20% margin on the interactive.
 */
let _observerOptions = $derived.by(() => ({
    ...(observerOptions || {}),
    rootMargin,
}));
// Set up observer for panel position ======================================
/**
 * Track intersecting panels. We can change the viz back to the last panel
 * which we otherwise can't do if there are 2 panels overlapping at once.
 */
let intersectingPanels = $state([]);
$effect(() => {
    if ($vizDims.status !== "ready" || !$steps.length) {
        return;
    }
    intersectingPanels = [];
    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                intersectingPanels = [...intersectingPanels, entry];
            }
            else {
                intersectingPanels = intersectingPanels.filter((panel) => panel.target !== entry.target);
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
    return () => {
        panelObserver?.disconnect();
    };
});
</script>
