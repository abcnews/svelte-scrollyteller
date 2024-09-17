<script lang="ts">
	/**
	 * @file
	 * Emits onscroll events for consumption outside the scrollyteller.
	 */
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let scrollytellerRef;
	const scrollHandler = () => {
		const rootRect = scrollytellerRef.getBoundingClientRect();

		dispatch('progress', {
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};
</script>

<svelte:window on:scroll={scrollHandler} />
