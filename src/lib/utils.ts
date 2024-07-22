import acto from '@abcnews/alternating-case-to-object';
import { selectMounts, isMount, getMountValue } from '@abcnews/mount-utils';
import type { PanelAlignment, PanelDefinition, ScrollytellerDefinition } from './types';

const piecemeal = Symbol('piecemeal');
const SELECTOR_COMMON = 'scrollyteller';

type PanelMeta = {
	[piecemeal]?: boolean;
	align?: PanelAlignment;
};
declare global {
	interface Window {
		__scrollytellers: {
			[key: string]: any;
		};
	}
}

function excludePanelMeta(config: PanelMeta) {
	const _config = {
		...config
	};

	delete _config[piecemeal];
	delete _config.align;

	return _config;
}

/**
 * Finds and grabs any nodes between #scrollyteller and #endscrollyteller
 * @param name The hash name for a scrollyteller (optional if there is only one on the page)
 * @param className The className to apply to the mount node
 * @param markerName The hash name for markers
 */
export const loadScrollyteller = (
	name?: string,
	className?: string,
	markerName = 'mark'
): ScrollytellerDefinition => {
	window.__scrollytellers = window.__scrollytellers || {};

	const openingMountValuePrefix = `${SELECTOR_COMMON}${name ? `NAME${name}` : ''}`;

	name = name || 'scrollyteller';

	if (!window.__scrollytellers[name]) {
		const firstEl: Element | null = selectMounts(openingMountValuePrefix)[0];

		if (!firstEl) {
			throw new Error(`Couldn't find element for #${openingMountValuePrefix}`);
		}

		if (!isMount(firstEl)) {
			throw new Error('Attempting to mount to a non-mount node');
		}

		className && firstEl.classList.add(className);
		const config = acto(getMountValue(firstEl, openingMountValuePrefix));
		const els: Element[] = [];
		let el: Element | null = firstEl.nextElementSibling;
		let hasMoreContent = true;

		while (hasMoreContent && el) {
			if (isMount(el, `end${SELECTOR_COMMON}`, true)) {
				hasMoreContent = false;
			} else {
				els.push(el);
				el = el.nextElementSibling;
			}
		}

		window.__scrollytellers[name] = {
			mountNode: firstEl,
			panels: loadPanels(els, config, markerName)
		};
	}

	return window.__scrollytellers[name];
};

/**
 * Parse a list of nodes looking for anchors starting with a given name
 * @param nodes
 * @param initialMarker
 * @param name
 */
const loadPanels = (nodes: Element[], initialConfig, name: string): PanelDefinition[] => {
	const panels: PanelDefinition[] = [];
	let nextConfigAndMeta: PanelMeta = initialConfig;
	let nextNodes: Element[] = [];

	// Commit the current nodes to a marker
	function pushPanel() {
		if (nextNodes.length === 0) return;

		panels.push({
			align: nextConfigAndMeta.align,
			data: excludePanelMeta(nextConfigAndMeta),
			nodes: nextNodes
		});
		nextNodes = [];
	}

	// Check the section nodes for panels and marker content
	nodes.forEach((node: Element, index: number) => {
		if (isMount(node, name)) {
			// Found a new marker so we should commit the last one
			pushPanel();

			// If marker has no config then just use the previous config
			const configString: string = getMountValue(node, name);

			if (configString) {
				nextConfigAndMeta = acto(configString) as unknown;
			} else {
				// Empty marks should stop the piecemeal flow
				nextConfigAndMeta[piecemeal] = false;
			}
		} else {
			// Any other nodes just get grouped for the next marker
			nextNodes.push(node);
		}

		// Any trailing nodes just get added as a last marker
		if (index === nodes.length - 1) {
			pushPanel();
		}

		// If piecemeal is on/true then each node has its own box
		if (nextConfigAndMeta[piecemeal]) {
			pushPanel();
		}

		// Remove the node from the document to keep things tidy
		node.parentNode && node.parentNode.removeChild(node);
	});

	return panels;
};

/**
 * An onScroll handler with throttling and scroll speed limiting.
 *
 * This is used because flinging the page up in Safari was creating too many
 * WebGL contexts and crashing the tab.
 *
 * @param fn - Function to call back when on scroll.
 * @param options
 * @param options.interval - interval to debounce scroll check.
 */
export const getScrollSpeed = (callback: (speed: number) => void) => {
	const getScrollTop = () => document.documentElement.scrollTop;
	let lastOffset = getScrollTop();
	let lastDate = Date.now();

	const onScroll = () => {
		const delayInMs = Date.now() - lastDate;
		const offset = getScrollTop() - lastOffset;
		const speedInpxPerMs = offset / delayInMs;
		const scrollSpeed = Math.abs(speedInpxPerMs);

		lastDate = Date.now();
		lastOffset = getScrollTop();

		callback(scrollSpeed);
	};
	window.addEventListener('scroll', onScroll, { passive: true });

	const onEndScroll = () => callback(0);
	window.addEventListener('scrollend', onEndScroll, { passive: true });

	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('scrollend', onEndScroll);
	};
};
