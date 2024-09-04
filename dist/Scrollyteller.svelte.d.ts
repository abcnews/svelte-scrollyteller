import { SvelteComponent } from "svelte";
import type { ComponentType } from 'svelte';
import type { PanelDefinition } from './types.js';
declare const __propDef: {
    props: {
        customPanel?: ComponentType | null;
        panels: PanelDefinition[];
        /** Whether to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default. */ onProgress?: boolean;
        /** @deprecated please use on:marker instead */ onMarker?: () => void;
        observerOptions?: IntersectionObserverInit;
        /**
             * When `true` we remove the slot from the DOM when not in the viewport, and
             * debounce loading markers while the browser is scrolling quickly.
             *
             * This is useful to free up layers/memory/CPU in complex interactives,
             * especially to prevent out of memory crashe issues with iPhone Safari.
             *
             * The trade-off is you may need to use `<link rel="preload"` for resources
             * that don't appear in the page by default.
             *
             * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload mdn preload docs}
             */ discardSlot?: boolean;
        layout?: {
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
    };
    events: {
        progress: CustomEvent<any>;
        marker: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {};
    bindings?: string;
};
export type ScrollytellerProps = typeof __propDef.props;
export type ScrollytellerEvents = typeof __propDef.events;
export type ScrollytellerSlots = typeof __propDef.slots;
export default class Scrollyteller extends SvelteComponent<ScrollytellerProps, ScrollytellerEvents, ScrollytellerSlots> {
}
export {};
