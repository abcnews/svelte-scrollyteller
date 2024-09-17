import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * @file
             * 2024-09 : This block checks for deprecated usage & throws helpful errors.
             * Please remove it after a suitable time has passed.
             */ onProgress: any;
        onMarker: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type DeprecationNoticeProps = typeof __propDef.props;
export type DeprecationNoticeEvents = typeof __propDef.events;
export type DeprecationNoticeSlots = typeof __propDef.slots;
export default class DeprecationNotice extends SvelteComponent<DeprecationNoticeProps, DeprecationNoticeEvents, DeprecationNoticeSlots> {
}
export {};
