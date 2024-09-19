/** @typedef {typeof __propDef.props}  GraphicObserverProps */
/** @typedef {typeof __propDef.events}  GraphicObserverEvents */
/** @typedef {typeof __propDef.slots}  GraphicObserverSlots */
export default class GraphicObserver extends SvelteComponent<{
    graphicRootEl: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GraphicObserverProps = typeof __propDef.props;
export type GraphicObserverEvents = typeof __propDef.events;
export type GraphicObserverSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        graphicRootEl: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
