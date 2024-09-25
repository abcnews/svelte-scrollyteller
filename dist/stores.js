import { derived, writable } from 'svelte/store';
import {} from './types';
/** Each panel inserts itself into this list when it instantiates */
export let steps = writable([]);
/** Margin either side + in between scrollyteller columns */
export let margin = writable(0);
/** Raw dimensions of the viz. Used to trigger panels when they hit 20% of the viz */
export const vizDims = writable({
    status: 'loading',
    dims: [0, 0]
});
/** Dims of the root container inside which the viz sits */
export const graphicRootDims = writable({
    status: 'loading',
    dims: [0, 0]
});
/** Dimensions of the viz */
export const ratio = writable(1);
/** Reactive window.innerWidth/innerHeight */
export const screenDims = writable([0, 0]);
/** Global align prop that resizeInteractive uses, etc. */
export const globalAlign = writable('centre');
const LARGE_TABLET_BREAKPOINT = 992;
/** Split screen mode happens when left/right aligned + not mobile */
export const isSplitScreen = derived([screenDims, globalAlign], ([$screenDims, $globalAlign]) => ['left', 'right'].includes($globalAlign) && $screenDims[0] >= LARGE_TABLET_BREAKPOINT);
/** The max width when the scrollyteller centres itself in the page */
export const maxScrollytellerWidth = derived([isSplitScreen], ([$isSplitScreen]) => $isSplitScreen ? 2040 : 1e6);
/**
 * Given the ratio of the graphic, work out whether it fits in the column and if
 * not, return how wide the column should be so there's no whitespace;
 */
export const maxGraphicWidth = derived([isSplitScreen, graphicRootDims, screenDims, ratio, maxScrollytellerWidth], ([$isSplitScreen, $graphicRootDims, $screenDims, $ratio, $maxScrollytellerWidth]) => {
    if (!$isSplitScreen) {
        return 1e6;
    }
    const [screenWidth] = $screenDims;
    const [, columnHeight] = $graphicRootDims.dims;
    const columnWidth = Math.min(screenWidth, $maxScrollytellerWidth) * 0.6;
    const widthBasedOnHeight = columnHeight * $ratio;
    return Math.min(widthBasedOnHeight, columnWidth);
});
