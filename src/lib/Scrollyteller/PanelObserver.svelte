<script lang="ts">
	import { onMount } from 'svelte';

	export let marker;
	export let steps;
	export let observerOptions;

	const panelObserver = new IntersectionObserver((entries: IntersectionEntries[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				marker = entry.target.scrollyData;
			}
		});
	}, observerOptions);

	onMount(() => {
		steps.forEach((step, i) => {
			panelObserver.observe(step);
		});
	});
</script>
