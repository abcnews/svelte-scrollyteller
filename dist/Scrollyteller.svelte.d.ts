import type { ComponentType } from 'svelte';
import type { PanelDefinition, Style } from './types.js';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const Scrollyteller: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    customPanel?: ComponentType | null;
    panels: PanelDefinition[];
    onProgress?: () => void;
    onMarker?: () => void;
    onLoad?: () => void;
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
    /**
         * Percent past the bottom of the viz the graphic has to be before it triggers. Default 20 (20%)
         */ vizMarkerThreshold?: number;
}, {
    default: {};
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type Scrollyteller = InstanceType<typeof Scrollyteller>;
export default Scrollyteller;
