import { SvelteComponent } from "svelte";
import type { ComponentType } from 'svelte';
import type { PanelDefinition, Style } from './types.js';
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
        layout?: Style;
        ratio?: number;
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
