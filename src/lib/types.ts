export interface IntersectionEntries extends IntersectionObserverEntry {
	target: PanelRef;
}

export type PanelAlignment = 'left' | 'right';

export interface PanelRef extends Element {
	scrollyData?: any;
}

export type PanelDefinition = {
	align?: PanelAlignment;
	panelClass?: string;
	data: any;
	nodes: Element[];
	steps?: PanelRef[];
};

export type ScrollytellerDefinition = {
	mountNode: Element;
	panels: PanelDefinition[];
};
