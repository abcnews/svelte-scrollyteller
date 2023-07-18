declare interface Window {
	__IS_ODYSSEY_FORMAT__: boolean;
}

interface IntersectionEntries extends IntersectionObserverEntry {
	target: PanelRef;
}

type PanelAlignment = 'left' | 'right';

interface PanelRef extends Element {
	scrollyData?: any;
}

interface PanelDefinition {
	align?: PanelAlignment;
	panelClass?: string;
	data: any;
	nodes: Element[];
	steps?: PanelRef[];
}

type ScrollytellerDefinition = {
	mountNode: Element;
	panels: PanelDefinition[];
};
