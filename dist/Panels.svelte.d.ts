import type { ComponentType } from "svelte";
import type { PanelDefinition, PanelRef, Style } from "./types.js";
interface Props {
    panelRoot: HTMLElement;
    layout: Style;
    panels: PanelDefinition[];
    customPanel?: ComponentType | null;
    steps?: PanelRef[];
}
declare const Panels: import("svelte").Component<Props, {}, "panelRoot">;
type Panels = ReturnType<typeof Panels>;
export default Panels;
