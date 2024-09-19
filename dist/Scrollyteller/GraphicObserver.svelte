<script>
	/**
	 * @file
	 * Observer on the graphic (viz) inserted into the main slot.
	 *
	 * This component is responsible for keeping the graphicDims store updated.
	 */
	import { onMount } from 'svelte';
	import { graphicDims } from '../stores';
	import { retryUntil } from './Scrollyteller.util';
	export let graphicRootEl;

	onMount(() => {
		let observer;
		// 1. wait for the viz to be inserted (graphicRootEl.children[0]). Sometimes
		// this is async, namely when using the web component version. We don't
		// watch for updates if the viz DOM node is replaced after the fact.
		retryUntil(() => graphicRootEl?.children).then(() => {
			observer = new ResizeObserver(
				([entry]) =>
					($graphicDims = {
						status: 'ready',
						dims: [entry.contentRect.width, entry.contentRect.height]
					})
			);
			observer.observe(graphicRootEl.children[0]);
		});

		return () => {
			observer?.disconnect();
		};
	});
</script>
