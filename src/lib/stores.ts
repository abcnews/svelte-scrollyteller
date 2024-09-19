import { writable } from 'svelte/store';

/** Calculated dimensions of the graphic */
export const graphicDims = writable({
	status: 'loading',
	dims: [0, 0]
});
