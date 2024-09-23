import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        layout: any;
        discardSlot?: boolean;
        isInViewport?: boolean;
    };
    events: {
        load: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {};
    bindings?: string;
};
export type VizProps = typeof __propDef.props;
export type VizEvents = typeof __propDef.events;
export type VizSlots = typeof __propDef.slots;
export default class Viz extends SvelteComponent<VizProps, VizEvents, VizSlots> {
}
export {};
