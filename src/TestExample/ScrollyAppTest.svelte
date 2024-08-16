<script lang="ts">
	import Scrollyteller, { loadScrollyteller } from '$lib/index.js';
	import PercentageIndicators from './PercentageIndicators.svelte';
	import Worm from './Worm/Worm.svelte';
    export let name = "test";

	const scrollyData = loadScrollyteller(
		name, // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
		'u-full', // Class to apply to mount point u-full makes it full width in Odyssey
		'mark' // Name of marker in CoreMedia eg. for "point" use #point default: #mark
	);

	let number = 0;
	let stProgress;

	const onMarker = ({detail}) => {
		number = detail.number;
	};

	const onProgress = ({detail}) => {
		stProgress = detail;
	};
</script>

<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>
<p>Before</p>

<Scrollyteller
	panels={scrollyData.panels}
	onProgress={true}
	on:marker={onMarker}
	on:progress={onProgress}

>
	<div class="graphic">
		<Worm />
		<span class="number">{number}</span>
		<PercentageIndicators percentage={Math.round(stProgress?.scrollPct * 100)} />
	</div>
</Scrollyteller>

<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>


<style lang="scss">
	.graphic {
		height: 100%;
		width: 100%;
		display: flex;
		position: relative;
	}

	.number {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: 900;
		font-size: xx-large;
	}
</style>
