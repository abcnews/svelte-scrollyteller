import type { Style } from "./types";
interface Props {
    layout: Style;
    discardSlot?: boolean;
    isInViewport?: boolean;
    onLoad?: (HTMLElement: any) => void;
    children?: import("svelte").Snippet;
}
declare const Viz: import("svelte").Component<Props, {}, "">;
type Viz = ReturnType<typeof Viz>;
export default Viz;
