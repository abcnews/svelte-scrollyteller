export interface PanelRef extends Element {
	scrollyData?: any;
}

export interface IntersectionEntries extends IntersectionObserverEntry {
	target: PanelRef;
}

export type PanelAlignment = 'left' | 'right';

/** Config options to control an individual panel */
export type PanelDefinition = {
	align?: PanelAlignment; // whether to align the panel to the left or right
	panelClass?: string; // a custom className to add to the panel
	data: any; // arbitrary blob or data that gets passed back to your component when this panel is onscreen
	nodes: Element[]; // DOM nodes to insert into the panel. Usually <p> elements, but could be anything renderable
	steps?: PanelRef[]; // A big array for all the panels to push their own refs into. Can be used later by end users.
};

export type ScrollytellerDefinition = {
	mountNode: Element;
	panels: PanelDefinition[];
};
