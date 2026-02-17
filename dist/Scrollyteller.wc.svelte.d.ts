export default Scrollyteller;
type Scrollyteller = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    panels: any[];
    layout: Record<string, any>;
};
declare const Scrollyteller: import("svelte").Component<{
    panels?: any[];
    layout?: Record<string, any>;
} & Record<string, any>, {
    panels: any[];
    layout: Record<string, any>;
}, "">;
import Scrollyteller from "./Scrollyteller.svelte";
type $$ComponentProps = {
    panels?: any[];
    layout?: Record<string, any>;
} & Record<string, any>;
