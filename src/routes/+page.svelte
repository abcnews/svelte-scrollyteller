<script lang="ts">
	import { browser } from '$app/environment';
	import App from '../TestExample/App.svelte';
	
</script>

{#if browser}
	<App />
{/if}
