import type { Action } from 'svelte/action';

export const children: Action<Element, Node[]> = (el, children) => {
	children.forEach((node) => el.appendChild(node));

	return {
		destroy() {
			children.forEach((node) => el.removeChild(node));
		}
	};
};
