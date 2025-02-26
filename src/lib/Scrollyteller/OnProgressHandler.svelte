<script lang="ts">
	/**
	 * @file
	 * Emits onscroll events for consumption outside the scrollyteller.
	 */

	let { onProgress, scrollytellerRef } = $props();
	const scrollHandler = () => {
		const rootRect = scrollytellerRef.getBoundingClientRect();

		onProgress('progress', {
			boundingRect: rootRect,
			rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
			scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
		});
	};
</script>

<svelte:window onscroll={scrollHandler} />
