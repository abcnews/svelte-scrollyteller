export interface PanelRef extends Element {
    scrollyData?: any;
}
export interface IntersectionEntries extends IntersectionObserverEntry {
    target: PanelRef;
}
/** Config options to control an individual panel */
export type PanelDefinition = {
    align?: string;
    transparentFloat?: boolean;
    panelClass?: string;
    data: any;
    nodes: Element[];
    steps?: PanelRef[];
};
export type ScrollytellerDefinition = {
    mountNode: Element;
    panels: PanelDefinition[];
};
