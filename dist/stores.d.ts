import { type PanelRef } from './types';
/** Each panel inserts itself into this list when it instantiates */
export declare function setSteps(): import("svelte/store").Writable<PanelRef[]>;
export declare function setMargin(): import("svelte/store").Writable<number>;
export declare function setVizDims(): import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
export declare function setGraphicRootDims(): import("svelte/store").Writable<{
    status: string;
    dims: number[];
}>;
export declare function setRatio(): import("svelte/store").Writable<number>;
export declare function setScreenDims(): import("svelte/store").Writable<number[]>;
export declare function setGlobalAlign(): import("svelte/store").Writable<string>;
/** Split screen mode happens when left/right aligned + not mobile */
export declare function setIsSplitScreen([screenDims, globalAlign]: [any, any]): import("svelte/store").Readable<boolean>;
export declare function setMaxScrollytellerWidth([isSplitScreen]: [any]): import("svelte/store").Readable<2040 | 1000000>;
export declare function setMaxGraphicWidth([isSplitScreen, graphicRootDims, screenDims, ratio, maxScrollytellerWidth]: [any, any, any, any, any]): import("svelte/store").Readable<number>;
export declare function setCurrentPanel(): import("svelte/store").Writable<number>;
