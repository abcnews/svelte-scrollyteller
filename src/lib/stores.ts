import { derived, writable } from 'svelte/store';
import { type PanelRef } from './types.js';

/** Each panel inserts itself into this list when it instantiates */
export function setSteps() {
	return writable<PanelRef[]>([]);

	/** Margin either side + in between scrollyteller columns */
}
export function setMargin() {
	return writable(0);

	/** Raw dimensions of the viz. Used to trigger panels when they hit 20% of the viz */
}
export function setVizDims() {
	return writable({
		status: 'loading',
		dims: [0, 0]
	});

	/** Dims of the root container inside which the viz sits */
}
export function setGraphicRootDims() {
	return writable({
		status: 'loading',
		dims: [0, 0]
	});

	/** Dimensions of the viz */
}
export function setRatio() {
	return writable(1);

	/** Reactive window.innerWidth/innerHeight */
}
export function setScreenDims() {
	return writable([0, 0]);

	/** Global align prop that resizeInteractive uses, etc. */
}
export function setGlobalAlign() {
	return writable('centre');
}

export function setMobileVariant() {
	return writable('blocks');
}

const LARGE_TABLET_BREAKPOINT = 992;
/** Split screen mode happens when left/right aligned + not mobile */
export function setIsSplitScreen([screenDims, globalAlign]) {
	return derived(
		[screenDims, globalAlign],
		([$screenDims, $globalAlign]) =>
			['left', 'right'].includes($globalAlign) && $screenDims[0] >= LARGE_TABLET_BREAKPOINT
	);
}

export function setIsMobileRowMode([screenDims, mobileVariant]) {
  return derived(
    [screenDims, mobileVariant],
    ([$screenDims, $mobileVariant]) => {
      console.log($screenDims, $mobileVariant);
      console.log($mobileVariant === 'rows' && $screenDims[0] < LARGE_TABLET_BREAKPOINT);
      return $mobileVariant === 'rows' && $screenDims[0] < LARGE_TABLET_BREAKPOINT;
    }
  );

  /** The max width when the scrollyteller centres itself in the page */
}
export function setMaxScrollytellerWidth([isSplitScreen]) {
	return derived([isSplitScreen], ([$isSplitScreen]) => ($isSplitScreen ? 2040 : 1e6));

	/**
	 * Given the ratio of the graphic, work out whether it fits in the column and if
	 * not, return how wide the column should be so there's no whitespace;
	 */
}
export function setMaxGraphicWidth([
	isSplitScreen,
	graphicRootDims,
	screenDims,
	ratio,
	maxScrollytellerWidth
]) {
	return derived(
		[isSplitScreen, graphicRootDims, screenDims, ratio, maxScrollytellerWidth],
		([$isSplitScreen, $graphicRootDims, $screenDims, $ratio, $maxScrollytellerWidth]) => {
			if (!$isSplitScreen) {
				return 1e6;
			}
			const [screenWidth] = $screenDims;
			const [, columnHeight] = $graphicRootDims.dims;
			const columnWidth = Math.min(screenWidth, $maxScrollytellerWidth) * 0.6;

			const widthBasedOnHeight = columnHeight * $ratio;
			return Math.min(widthBasedOnHeight, columnWidth);
		}
	);
}
export function setCurrentPanel() {
	return writable(0);
}
