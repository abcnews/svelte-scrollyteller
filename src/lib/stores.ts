import { derived, writable } from 'svelte/store';

/** Calculated dimensions of the graphic */
export const _graphicDims = writable({
	status: 'loading',
	dims: [0, 0]
});

export const graphicRootDims = writable({
	status: 'loading',
	dims: [0, 0]
});

export const graphicDims = derived(_graphicDims, ($graphicDims) => ({
	...$graphicDims,
	ratio: $graphicDims.dims[1] / $graphicDims.dims[0]
}));

/** Reactive window.innerWidth/innerHeight */
export const screenDims = writable([0, 0]);

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
	[isSplitScreen, graphicDims, screenDims],
	([$isSplitScreen, $graphicDims, $screenDims]) => {
		if (!$isSplitScreen) {
			return null;
		}
		const [screenWidth] = $screenDims;
		const [, graphicHeight] = $graphicDims.dims;
		// FIXME: This doesn't include margins, is not accurate.
		const columnWidth = Math.min(screenWidth, MAX_SCROLLYTELLER_WIDTH) * 0.6;

		const speculativeHeight = columnWidth * $graphicDims.ratio;
		const speculativeWidth = graphicHeight / $graphicDims.ratio;

		if (speculativeHeight > graphicHeight) {
			return speculativeWidth;
		} else {
			return null;
		}
	}
);
