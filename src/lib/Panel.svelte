<script lang="ts">
	import { onMount } from 'svelte';
	import type { PanelRef, PanelDefinition } from './types';

	export let props: PanelDefinition;
	const { align, panelClass, data, nodes = [], steps = [] } = props;

	let panelRef: PanelRef;

	onMount(() => {
		panelRef.scrollyData = data;
		steps.push(panelRef);
	});
</script>

<div class={`st-panel ${align || ''} ${panelClass || ''}`} bind:this={panelRef}>
  {#each nodes as node}
    {@html node.outerHTML}
  {/each}
</div>

<style lang="scss">
  $breakpoint: 61.25rem;

.st-panel {
  box-sizing: border-box;

  padding-top: 2.25rem;
  padding-bottom: 2.25rem;

  margin-bottom: 40vh;
  margin-top: 40vh;
  margin-left: auto;
  margin-right: auto;

  position: relative;
  z-index: 1;

  &.first {
    margin-top: 100vh;
  }

  &.last {
    margin-bottom: 100vh;
  }

  &::before {
    content: '';

    /* background-color: var(--color-panel-background, rgba(0, 0, 0, 0.6)); */
    box-shadow: 0 0.25rem 0.5rem rgb(0 0 0 / 26%);
    background-color: var(--color-panel-background, hsla(0, 0%, 100%, 0.9));
    border-radius: 2px;

    position: absolute;
    z-index: -1;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: calc(66.66667% + 3rem);
    height: 100%;
  }

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  :global(p) {
    font-family: ABCSerif, Book Antiqua, Palatino Linotype, Palatino, serif;
    font-size: 1.375rem;
    line-height: 1.666666667;
    /* color: var(--color-panel-text, #fefefe); */
    color: var(--color-panel-text, #111);

    padding-left: 0.875rem;
    padding-right: 0.875rem;

    margin-top: 0;
    margin-left: auto !important;
    margin-right: auto !important;

    width: 66.666667%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  & > :global(img) {
    max-width: 66%;
    display: block;
    margin: auto;
    height: auto;
  }

  /* // Chrome fix https://stackoverflow.com/a/28906246/955917 */
  -webkit-transform: translate3d(0, 0, 0);
}

@media only screen and (min-width: 1023px) {
  :global(.right) {
    margin-right: calc(30% - 24.75rem) !important;
    width: 49.5rem !important;
  }

  :global(.left) {
    margin-left: calc(30% - 24.75rem) !important;
    width: 49.5rem !important;
  }
}

@media only screen and (max-width: $breakpoint) {
  .scrollyteller {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    margin-right: auto !important;
    margin-left: auto !important;

    width: 100% !important;

    &::before {
      width: calc(83.3333% + 0.75rem);
    }

    :global(p) {
      width: 83.333333%;
      font-size: 1.125rem;
      line-height: 1.555555556;
    }
  }
}
</style>
