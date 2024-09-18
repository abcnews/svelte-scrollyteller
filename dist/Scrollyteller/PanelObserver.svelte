<script>import { onMount } from 'svelte';
import { retryUntil } from './Scrollyteller.util';
export let align = '';
export let graphicRootEl;
export let marker;
export let observerOptions;
export let steps;
export let isDebug;
let status = 'loading';
let graphicDims = [0, 0];
let graphicEl;
let innerWidth = 0;
let innerHeight = 0;
/** Split screen mode happens when left/right aligned + not mobile */
$: isSplitScreen = ['left', 'right'].includes(align) && innerWidth >= 992;
/**
 * For split screens, trigger the intersection observer when the block is
 * over 20% of the interactive. Otherwise 10% of the screen height.
 */
$: rootMargin = isSplitScreen
    ? Math.round((innerHeight - (graphicDims[1] || innerHeight) * 0.6) / 2)
    : Math.round(innerHeight / 8);
/**
 * When observerOptions isn't set, default to either 0.5 for centred blocks
 * or a 20% margin on the interactive.
 */
let _observerOptions = observerOptions;
$: {
    if (observerOptions) {
        _observerOptions = observerOptions;
    }
    else {
        _observerOptions = {
            rootMargin: `-${rootMargin}px 0px -${rootMargin}px 0px`
        };
    }
}
// Set up observer for graphic size ========================================
onMount(() => {
    let observer;
    retryUntil(() => graphicRootEl?.children).then(() => {
        graphicEl = graphicRootEl.children[0];
        observer = new ResizeObserver(([entry]) => (graphicDims = [entry.contentRect.width, entry.contentRect.height]));
        observer.observe(graphicEl);
        status = 'ready';
    });
    return () => {
        observer?.disconnect();
    };
});
// Set up observer for panel position ======================================
let panelObserver;
/**
 * Track intersecting panels. We can change the viz back to the last panel
 * which we otherwise can't do if there are 2 panels overlapping at once.
 */
let intersectingPanels = [];
$: {
    if (status === 'ready') {
        panelObserver?.disconnect();
        panelObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log({ entry });
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
                }
            });
        }, _observerOptions);
        steps.forEach((step, i) => {
            panelObserver.observe(step);
        });
    }
    else {
        panelObserver?.disconnect();
    }
}
onMount(() => panelObserver?.disconnect());
</script>

<svelte:window bind:innerWidth bind:innerHeight />

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
