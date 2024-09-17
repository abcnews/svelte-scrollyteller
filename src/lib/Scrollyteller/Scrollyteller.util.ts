export enum ScrollPositions {
	FULL = 'FULL',
	ABOVE = 'ABOVE',
	BELOW = 'BELOW'
}

export type Style = {
	/**
	 * What styles to apply to panels.
	 * - `centre` - centre panels, default
	 * - `left` - float panels to the left and slot to the right
	 * - `right` - float panels to the right and slot to the left
	 * - `none` - don't apply styles other than font-size. You are responsible for all styling.
	 */
	align?: string;
	/**
	 * Disable block background when panels go left/right. Default true when
	 * global is left/right.
	 */
	transparentFloat?: boolean;

	/**
	 * Resize the interactive to fit the left/right dimensions
	 */
	resizeInteractive?: boolean;
};

export const getScrollingPos = (scrollytellerRef) => {
	const boundingRect = scrollytellerRef.getBoundingClientRect();
	if (boundingRect.bottom - window.innerHeight < 0) {
		return ScrollPositions.BELOW;
	}
	if (boundingRect.top > 0) {
		return ScrollPositions.ABOVE;
	}
	return ScrollPositions.FULL;
};

/**
 * An onScroll handler with throttling and scroll speed limiting.
 *
 * This is used because flinging the page up in Safari was creating too many
 * WebGL contexts and crashing the tab.
 *
 * @param fn - Function to call back when on scroll.
 * @param options
 * @param options.interval - interval to debounce scroll check.
 */
export const getScrollSpeed = (callback: (speed: number) => void) => {
	const getScrollTop = () => document.documentElement.scrollTop;
	let lastOffset = getScrollTop();
	let lastDate = Date.now();

	const onScroll = () => {
		const delayInMs = Date.now() - lastDate;
		const offset = getScrollTop() - lastOffset;
		const speedInpxPerMs = offset / delayInMs;
		const scrollSpeed = Math.abs(speedInpxPerMs);

		lastDate = Date.now();
		lastOffset = getScrollTop();

		callback(scrollSpeed);
	};
	window.addEventListener('scroll', onScroll, { passive: true });

	const onEndScroll = () => callback(0);
	window.addEventListener('scrollend', onEndScroll, { passive: true });

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('scrollend', onEndScroll);
	};
};
