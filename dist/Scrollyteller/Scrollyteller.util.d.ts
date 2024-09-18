export declare enum ScrollPositions {
    FULL = "FULL",
    ABOVE = "ABOVE",
    BELOW = "BELOW"
}
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
};
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
