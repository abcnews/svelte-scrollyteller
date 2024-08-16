<script>
	import { onMount } from "svelte";
	import ScrollyAppTest from "./ScrollyAppTest.svelte";
	import TestArticleData from "./TestArticleData.svelte";
	let status = 'loading';
	onMount(() => {
		status= 'ready'
	})
</script>
<h2>Jump to test:</h2>
<ol>
	<li><a href="#test1">Dark mode</a></li>
	<li><a href="#test2">Light mode</a></li>
	<li><a href="#test3">Custom background</a></li>
	<li><a href="#test4">Custom colours</a></li>
	<li><a href="#test5">Legacy styles</a></li>
</ol>

<div id="test1" class="root night">
	<div class="description">
		<h1>Dark mode</h1>
		<p>In which Scrollyteller inherits dark mode settings from Odyssey variables</p>
	</div>

	<!-- Load some test data for the scrollyteller component to consume -->
	<TestArticleData name="test1"/>

	<!-- Once the test data is loaded, load the scrollyteller -->
	{#if (status === 'ready')}<ScrollyAppTest name="test1"/>{/if}
</div>
<div id="test2" class="root light">
	<div class="description">
		<h1>Light mode</h1>
		<p>In which Scrollyteller inherits light mode settings from Odyssey variables</p>
	</div>
	<TestArticleData name="test2"/>
	{#if (status === 'ready')}<ScrollyAppTest name="test2"/>{/if}
</div>
<div  id="test3" class="root custom">
	<div class="description">
		<h1>Custom backgrounds</h1>
		<p>In which the <code>--bg</code> variable changes the colour of the background panel.</p>
	</div>
	<TestArticleData name="test3"/>
	{#if (status === 'ready')}<ScrollyAppTest name="test3"/>{/if}
</div>
<div  id="test4" class="root custom2">
	<div class="description">
		<h1>Custom panel colours</h1>
		<p>In which the panel colours are overridden in CSS.</p>
	</div>
	<TestArticleData name="test4"/>
	{#if (status === 'ready')}<ScrollyAppTest name="test4"/>{/if}
</div>
<div  id="test5" class="root is-legacy">
	<div class="description">
		<h1>Legacy styles</h1>
		<p>In which the panel colours are overridden in CSS.</p>
	</div>
	<TestArticleData name="test5"/>
	{#if (status === 'ready')}<ScrollyAppTest name="test5"/>{/if}
</div>

<style lang="scss">
:global(body) {
	margin: 0;
	font-family: sans-serif;
}

.description{
	padding:1em;
	margin:1em;
	background:rgba(0,0,0,0.2);
	border-radius:24px;
}

.night{
	background:linear-gradient(to bottom right, #470449, #021a41);
	color:white;
  --od-colour-theme-surface-over-image: rgba(15, 15, 15, 0.75);
  --od-colour-text-primary: var(--nw-colour-text-primary, rgb(235, 235, 235));
  --worm:cyan;
}

.light{
	background:linear-gradient(to bottom right, #ffffff, #bfe8ff);
	color:black;
	--od-colour-theme-surface-over-image: rgba(255, 255, 255, 0.85);
	--od-colour-text-primary: var(--nw-colour-text-primary, rgb(0, 0, 0));
	--worm:hotpink;
}

.custom{
	--bg: #fadaac;
	background: linear-gradient(to bottom right, #fadaac, #d4b994);
	color: #111;
	--od-colour-theme-surface-over-image: rgba(255, 255, 255, 0.85);
	--od-colour-text-primary: var(--nw-colour-text-primary, rgb(0, 0, 0));
	--worm: #554125;
}

.custom2{
	background:yellow;
	color:red;
	--color-panel-background: red;
	--color-panel-text: yellow;
	--color-panel-opacity: 0.5;
	--color-panel-filter: blur(3rem);
	--worm: red;
}

.is-legacy{
	background:linear-gradient(to bottom right, white, lightgray);
	color:black;
	--od-colour-theme-surface-over-image: rgba(255, 255, 255, 0.85);
	--od-colour-text-primary: var(--nw-colour-text-primary, rgb(0, 0, 0));
	--worm:teal;
}
</style>