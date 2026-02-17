export default GraphicObserver;
type GraphicObserver = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const GraphicObserver: import("svelte").Component<{
    graphicRootEl: any;
}, {}, "">;
type $$ComponentProps = {
    graphicRootEl: any;
};
