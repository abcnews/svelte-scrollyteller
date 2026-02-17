interface Props {
    align: string;
    transparentFloat: boolean;
    panelClass: string;
    data: any;
    nodes: Element[];
    i?: number;
}
declare const Panel: import("svelte").Component<Props, {}, "">;
type Panel = ReturnType<typeof Panel>;
export default Panel;
