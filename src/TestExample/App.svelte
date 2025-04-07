<script>
	import { onMount } from 'svelte';
	import ScrollyAppTest from './ScrollyAppTest.svelte';
	import TestArticleData from './TestArticleData.svelte';
	let status = 'loading';

	let background = 'night';
	let align = 'centre';
  let mobileVariant = 'blocks';
	let transparentFloat = undefined;
	let resizeInteractive = undefined;
	let vizMarkerThreshold = 20;
	let ratio = 1;

	$: layout = { align, transparentFloat, resizeInteractive, mobileVariant };
	onMount(() => {
		status = 'ready';
	});
</script>

<div class="toolbar">
	<label>
		Theme:
		<select bind:value={background}>
			<option value="night">night</option>
			<option value="light">light</option>
			<option value="custom">custom</option>
			<option value="custom2">custom2</option>
		</select>
	</label>

	<label>
		Align:
		<select bind:value={align}>
			<option value="centre">centre</option>
			<option value="left">left</option>
			<option value="right">right</option>
			<option value="none">none</option>
		</select>
	</label>

	<label>
		transparentFloat:
		<select bind:value={transparentFloat}>
			<option value={undefined}>undefined</option>
			<option value={true}>true</option>
			<option value={false}>false</option>
		</select>
	</label>

	<label>
		resizeInteractive:
		<select bind:value={resizeInteractive}>
			<option value={undefined}>undefined</option>
			<option value={true}>true</option>
			<option value={false}>false</option>
		</select>
	</label>

	<label>
		mobileVariant:
		<select bind:value={mobileVariant}>
			<option value={undefined}>undefined</option>
			<option value={"blocks"}>Blocks</option>
			<option value={"rows"}>Rows</option>
		</select>
	</label>

	<label>
		Viz ratio:
		<select bind:value={ratio}>
			<option value={9 / 16}>portrait 16x9</option>
			<option value={16 / 9}>landscape 16x9</option>
			<option value={1}>1x1</option>
		</select>
	</label>

	<label>
		Viz marker threshold:
		<input type="number" bind:value={vizMarkerThreshold} min="0" max="49" />%
	</label>
</div>

<div
	id="test1"
	class={`root ${background}`}
	data-scheme={background === 'night' ? 'dark' : 'light'}
>
	<!-- Load some test data for the scrollyteller component to consume -->
	<TestArticleData name="test1" />

	<!-- Once the test data is loaded, load the scrollyteller -->
	{#key JSON.stringify([layout, vizMarkerThreshold])}
		{#if status === 'ready'}<ScrollyAppTest
				name="test1"
				{layout}
				{ratio}
				{vizMarkerThreshold}
			/>{/if}
	{/key}

	<div class="description">
		<h1>Assorted alignment</h1>
		<p></p>
	</div>
</div>

<style lang="scss">
	:global(body) {
		margin: 0;
		font-family: sans-serif;
	}

	.description {
		padding: 1em;
		margin: 1em;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 24px;
	}

	.night {
		background: linear-gradient(to bottom right, #470449, #021a41);
		color: white;
		--od-colour-theme-surface-over-image: rgba(15, 15, 15, 0.75);
		--od-colour-text-primary: var(--nw-colour-text-primary, rgb(235, 235, 235));
		--worm: cyan;
	}

	.light {
		background: linear-gradient(to bottom right, #ffffff, #bfe8ff);
		color: black;
		--od-colour-theme-surface-over-image: rgba(255, 255, 255, 0.85);
		--od-colour-text-primary: var(--nw-colour-text-primary, rgb(0, 0, 0));
		--worm: hotpink;
	}

	.custom {
		--bg: #fadaac;
		background: linear-gradient(to bottom right, #fadaac, #d4b994);
		color: #111;
		--od-colour-theme-surface-over-image: rgba(255, 255, 255, 0.85);
		--od-colour-text-primary: var(--nw-colour-text-primary, rgb(0, 0, 0));
		--worm: #554125;
	}

	.custom2 {
		background: yellow;
		color: red;
		--color-panel-background: orange;
		--color-panel-text: red;
		--color-panel-opacity: 0.9;
		--color-panel-filter: blur(3rem);
		--worm: red;
	}

	.toolbar {
		position: fixed;
		top: 0.5rem;
		left: 0.5rem;
		max-width: calc(100% - 10em);
		display: inline-flex;
		gap: 1rem;
		background: white;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		z-index: 100;
	}
</style>
