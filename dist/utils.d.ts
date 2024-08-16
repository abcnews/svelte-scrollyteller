import type { ScrollytellerDefinition } from './types';
declare global {
    interface Window {
        __scrollytellers: {
            [key: string]: any;
        };
    }
}
/**
 * Finds and grabs any nodes between #scrollyteller and #endscrollyteller
 * @param name The hash name for a scrollyteller (optional if there is only one on the page)
 * @param className The className to apply to the mount node
 * @param markerName The hash name for markers
 */
export declare const loadScrollyteller: (name?: string, className?: string, markerName?: string) => ScrollytellerDefinition;
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
