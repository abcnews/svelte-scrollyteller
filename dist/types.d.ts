import type { Writable } from "svelte/store";
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
    /**
     * Toggle mobile betwen:
     * * `blocks`: traditional block layout scrolling over the viz
     * * `rows`: split screen layout with viz on top and text below
     */
    mobileVariant?: "blocks" | "rows";
};
export interface PanelRef<Data = any> extends Element {
    scrollyData?: Data;
}
export interface IntersectionEntries extends IntersectionObserverEntry {
    target: PanelRef;
}
/** Config options to control an individual panel */
export type PanelDefinition<Data = any> = {
    align?: string;
    transparentFloat?: boolean;
    panelClass?: string;
    data: Data;
    nodes: Element[];
    steps?: PanelRef<Data>[];
};
export type ScrollytellerDefinition<Data = any> = {
    mountNode: Element;
    panels: PanelDefinition<Data>[];
};
/** Svelte Store dimensions */
export type WritableDims = Writable<{
    status: string;
    dims: number[];
}>;
