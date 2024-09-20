/** Calculated dimensions of the graphic */
export declare const _graphicDims: import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
export declare const graphicRootDims: import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
export declare const graphicDims: import("svelte/store").Readable<{
    ratio: number;
    status: string;
    dims: number[];
}>;
/** Reactive window.innerWidth/innerHeight */
export declare const screenDims: import("svelte/store").Writable<number[]>;
export declare const globalAlign: import("svelte/store").Writable<string>;
/** Split screen mode happens when left/right aligned + not mobile */
export declare const isSplitScreen: import("svelte/store").Readable<boolean>;
/** The max width when the scrollyteller centres itself in the page */
export declare const MAX_SCROLLYTELLER_WIDTH = 2040;
/**
 * Given the ratio of the graphic, work out whether it fits in the column and if
 * not, return how wide the column should be so there's no whitespace;
 */
export declare const maxGraphicWidth: import("svelte/store").Readable<number>;
