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
export interface PanelRef extends Element {
	scrollyData?: any;
}

export interface IntersectionEntries extends IntersectionObserverEntry {
	target: PanelRef;
}

/** Config options to control an individual panel */
export type PanelDefinition = {
	align?: string; // whether to align the panel to the left or right
	transparentFloat?: boolean; // whether to remove background when left/right
	panelClass?: string; // a custom className to add to the panel
	data: any; // arbitrary blob or data that gets passed back to your component when this panel is onscreen
	nodes: Element[]; // DOM nodes to insert into the panel. Usually <p> elements, but could be anything renderable
	steps?: PanelRef[]; // A big array for all the panels to push their own refs into. Can be used later by end users.
};

export type ScrollytellerDefinition = {
	mountNode: Element;
	panels: PanelDefinition[];
};
