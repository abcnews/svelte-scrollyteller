import { SvelteComponent } from "svelte";
import type { PanelDefinition } from './types.js';
declare const __propDef: {
    props: {
        props: PanelDefinition;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type PanelProps = typeof __propDef.props;
export type PanelEvents = typeof __propDef.events;
export type PanelSlots = typeof __propDef.slots;
export default class Panel extends SvelteComponent<PanelProps, PanelEvents, PanelSlots> {
}
export {};
