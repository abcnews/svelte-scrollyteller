import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        marker: any;
        steps: any;
        observerOptions: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type PanelObserverProps = typeof __propDef.props;
export type PanelObserverEvents = typeof __propDef.events;
export type PanelObserverSlots = typeof __propDef.slots;
export default class PanelObserver extends SvelteComponent<PanelObserverProps, PanelObserverEvents, PanelObserverSlots> {
}
export {};
