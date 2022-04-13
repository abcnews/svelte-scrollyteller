<script lang="ts">
	import App from '../TestExample/App.svelte';
	import { browser } from '$app/env';
</script>

{#if browser}
	<App />
{/if}
