<script>
	import worm from './worm.svg';

	let animating = false;
	function onClick() {
		animating = !animating;
	}
</script>

<div class="wrapper">
	<div class="text"><slot /></div>
	<button on:click={onClick}>
		<img src={worm} alt="" class={animating && 'animating'} />
	</button>
</div>

<style lang="scss">
	button {
		background: none;
		border: none;
	}
	img {
		width: 240px;
		height: auto;
		transition: all 1s;
	}
	img.animating {
		animation: pulse 2s infinite;
	}

	.wrapper {
		position: relative;
		display: flex;
		margin: auto;
	}

	.text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: xx-large;
		font-weight: 900;
	}

	@keyframes pulse {
		from {
			scale: 1;
		}
		50% {
			scale: 1.1;
		}
		to {
			scale: 1;
		}
	}
</style>
