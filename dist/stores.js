import { derived, writable } from 'svelte/store';
import {} from './types';
/** Each panel inserts itself into this list when it instantiates */
export let steps = writable([]);
/** Margin either side + in between scrollyteller columns */
export let margin = writable(0);
/** Raw dimensions of the graphic. Use calculated `vizDims` instead */
export const _vizDims = writable({
	status: 'loading',
	dims: [0, 0]
});
/** Calculated dimensions of the viz */
export const vizDims = derived(_vizDims, ($vizDims) => ({
	...$vizDims,
	ratio: $vizDims.dims[1] / $vizDims.dims[0]
}));
/** Reactive window.innerWidth/innerHeight */
export const screenDims = writable([0, 0]);
/** Global align prop that resizeInteractive uses, etc. */
export const globalAlign = writable('centre');
const LARGE_TABLET_BREAKPOINT = 992;
/** Split screen mode happens when left/right aligned + not mobile */
export const isSplitScreen = derived(
	[screenDims, globalAlign],
	([$screenDims, $globalAlign]) =>
		['left', 'right'].includes($globalAlign) && $screenDims[0] >= LARGE_TABLET_BREAKPOINT
);
/** The max width when the scrollyteller centres itself in the page */
export const MAX_SCROLLYTELLER_WIDTH = 2040;
/**
 * Given the ratio of the graphic, work out whether it fits in the column and if
 * not, return how wide the column should be so there's no whitespace;
 */
export const maxGraphicWidth = derived(
	[isSplitScreen, vizDims, screenDims, margin],
	([$isSplitScreen, $vizDims, $screenDims, $margin]) => {
		if (!$isSplitScreen) {
			return null;
		}
		const [screenWidth] = $screenDims;
		const [, graphicHeight] = $vizDims.dims;
		const columnWidth = Math.min(screenWidth, MAX_SCROLLYTELLER_WIDTH) * 0.6;
		const speculativeHeight = columnWidth * $vizDims.ratio;
		const speculativeWidth = graphicHeight / $vizDims.ratio;
		if (speculativeHeight > graphicHeight) {
			return speculativeWidth;
		} else {
			return null;
		}
	}
);
