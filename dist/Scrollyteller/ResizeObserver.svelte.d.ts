import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        scrollytellerRef: HTMLElement;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type ResizeObserverProps = typeof __propDef.props;
export type ResizeObserverEvents = typeof __propDef.events;
export type ResizeObserverSlots = typeof __propDef.slots;
export default class ResizeObserver extends SvelteComponent<ResizeObserverProps, ResizeObserverEvents, ResizeObserverSlots> {
}
export {};
