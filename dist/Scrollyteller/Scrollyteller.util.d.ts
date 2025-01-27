import { ScrollPositions } from '../types.js';
export declare const getScrollingPos: (scrollytellerRef: any) => ScrollPositions;
/**
 * An onScroll handler with throttling and scroll speed limiting.
 *
 * This is used because flinging the page up in Safari was creating too many
 * WebGL contexts and crashing the tab.
 *
 * @param fn - Function to call back when on scroll.
 * @param options
 * @param options.interval - interval to debounce scroll check.
 */
export declare const getScrollSpeed: (callback: (speed: number) => void) => () => void;
/** Keep trying until the condition is met */
export declare const retryUntil: (condition: any) => Promise<unknown>;
