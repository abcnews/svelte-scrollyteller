import { SvelteComponent } from "svelte";
import type { ComponentType } from 'svelte';
import type { PanelDefinition, PanelRef, Style } from './types';
declare const __propDef: {
    props: {
        layout: Style;
        panels: PanelDefinition[];
        customPanel?: ComponentType | null;
        steps?: PanelRef[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type PanelsProps = typeof __propDef.props;
export type PanelsEvents = typeof __propDef.events;
export type PanelsSlots = typeof __propDef.slots;
export default class Panels extends SvelteComponent<PanelsProps, PanelsEvents, PanelsSlots> {
}
export {};
