/** @typedef {typeof __propDef.props}  ScrollytellerProps */
/** @typedef {typeof __propDef.events}  ScrollytellerEvents */
/** @typedef {typeof __propDef.slots}  ScrollytellerSlots */
export default class Scrollyteller extends SvelteComponent<{
    [x: string]: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    constructor();
    /**accessor*/
    set panels(_: any);
    get panels(): any;
    /**accessor*/
    set graphicRootEl(_: any);
    get graphicRootEl(): any;
}
export type ScrollytellerProps = typeof __propDef.props;
export type ScrollytellerEvents = typeof __propDef.events;
export type ScrollytellerSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
