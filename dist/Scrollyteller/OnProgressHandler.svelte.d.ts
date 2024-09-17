import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        scrollytellerRef: any;
    };
    events: {
        progress: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type OnProgressHandlerProps = typeof __propDef.props;
export type OnProgressHandlerEvents = typeof __propDef.events;
export type OnProgressHandlerSlots = typeof __propDef.slots;
export default class OnProgressHandler extends SvelteComponent<OnProgressHandlerProps, OnProgressHandlerEvents, OnProgressHandlerSlots> {
}
export {};
