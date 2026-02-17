import type { ScrollytellerDefinition } from "./types.js";
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
export declare const loadScrollyteller: <Data = any>(name?: string, className?: string, markerName?: string) => ScrollytellerDefinition<Data>;
