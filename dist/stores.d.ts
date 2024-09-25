import { type PanelRef } from './types';
/** Each panel inserts itself into this list when it instantiates */
export declare let steps: import("svelte/store").Writable<PanelRef[]>;
/** Margin either side + in between scrollyteller columns */
export declare let margin: import("svelte/store").Writable<number>;
/** Raw dimensions of the viz. Used to trigger panels when they hit 20% of the viz */
export declare const vizDims: import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
/** Dims of the root container inside which the viz sits */
export declare const graphicRootDims: import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
/** Dimensions of the viz */
export declare const ratio: import("svelte/store").Writable<number>;
/** Reactive window.innerWidth/innerHeight */
export declare const screenDims: import("svelte/store").Writable<number[]>;
/** Global align prop that resizeInteractive uses, etc. */
export declare const globalAlign: import("svelte/store").Writable<string>;
/** Split screen mode happens when left/right aligned + not mobile */
export declare const isSplitScreen: import("svelte/store").Readable<boolean>;
/** The max width when the scrollyteller centres itself in the page */
export declare const maxScrollytellerWidth: import("svelte/store").Readable<2040 | 1000000>;
/**
 * Given the ratio of the graphic, work out whether it fits in the column and if
 * not, return how wide the column should be so there's no whitespace;
 */
export declare const maxGraphicWidth: import("svelte/store").Readable<number>;
