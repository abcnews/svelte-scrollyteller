import type { ComponentType } from "svelte";
import type { PanelDefinition, Style } from "./types.js";
declare function $$render<Data = any>(): {
    props: {
        customPanel?: ComponentType | null;
        panels: PanelDefinition<Data>[];
        onProgress?: (type: string, payload: {
            boundingRect: DOMRect;
            rootPct: number;
            scrollPct: number;
        }) => void;
        onMarker?: (marker: Data) => void;
        onLoad?: (HTMLElement: any) => void;
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
         */
        discardSlot?: boolean;
        layout?: Style;
        ratio?: number;
        /**
         * Percent past the bottom of the viz the graphic has to be before it triggers. Default 20 (20%)
         */
        vizMarkerThreshold?: number;
        children?: import("svelte").Snippet;
    };
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<Data = any> {
    props(): ReturnType<typeof $$render<Data>>['props'];
    events(): ReturnType<typeof $$render<Data>>['events'];
    slots(): ReturnType<typeof $$render<Data>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Data = any>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Data>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Data>['props']>, ReturnType<__sveltets_Render<Data>['events']>, ReturnType<__sveltets_Render<Data>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Data>['bindings']>;
    } & ReturnType<__sveltets_Render<Data>['exports']>;
    <Data = any>(internal: unknown, props: ReturnType<__sveltets_Render<Data>['props']> & {}): ReturnType<__sveltets_Render<Data>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Scrollyteller: $$IsomorphicComponent;
type Scrollyteller<Data = any> = InstanceType<typeof Scrollyteller<Data>>;
export default Scrollyteller;
