<script>
	/**
	 * @file
	 * Observer on the graphic (viz) inserted into the main slot.
	 *
	 * This component is responsible for keeping the graphicDims store updated.
	 */
	import { onMount } from 'svelte';
	import { vizDims, graphicRootDims, maxGraphicWidth } from '../stores';
	import { retryUntil } from './Scrollyteller.util';
	export let graphicRootEl;

	onMount(() => {
		let observer;

		observer = new ResizeObserver((entries) => {
			requestAnimationFrame(() => {
				entries.forEach((entry) => {
					if (entry.target === graphicRootEl) {
						$graphicRootDims = {
							status: 'ready',
							dims: [entry.contentRect.width, entry.contentRect.height]
						};
					} else {
						$vizDims = {
							status: 'ready',
							dims: [entry.contentRect.width, entry.contentRect.height]
						};
					}
				});
			});
		});
		retryUntil(() => graphicRootEl).then(() => {
			observer.observe(graphicRootEl);
		});

		// 1. wait for the viz to be inserted (graphicRootEl.children[0]). Sometimes
		// this is async, namely when using the web component version. We don't
		// watch for updates if the viz DOM node is replaced after the fact.
		retryUntil(() => graphicRootEl?.children?.length).then(() => {
			const child = graphicRootEl.children[0];
			observer.observe(child);
		});

		return () => {
			observer?.disconnect();
		};
	});

	$: console.log({ $maxGraphicWidth });
</script>
