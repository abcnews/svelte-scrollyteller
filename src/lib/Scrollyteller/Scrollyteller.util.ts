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
