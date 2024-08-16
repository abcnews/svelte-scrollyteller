<script>import { onMount } from 'svelte';
import { children } from './actions.js';
export let props;
const { align, panelClass, data, nodes = [], steps = [] } = props;
let panelRef;
onMount(() => {
    panelRef.scrollyData = data;
    steps.push(panelRef);
});
</script>

<div
	class={`st-panel ${align || ''} ${panelClass || ''}`}
	bind:this={panelRef}
	use:children={nodes}
/>

<style>.st-panel {
  --panel-radius: 0.75rem;
  --panel-background: var(--color-panel-background, var(--bg, var(--od-colour-theme-surface-over-image)));
  --panel-color: var(--color-panel-text, var(--od-colour-text-primary));
  --panel-opacity: var(--color-panel-opacity, 0.75);
  --panel-filter: var(--color-panel-filter, blur(0.3125rem));
  -webkit-backdrop-filter: var(--panel-filter);
  backdrop-filter: var(--panel-filter);
  color: var(--panel-color);
  box-sizing: border-box;
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
  margin-bottom: 40vh;
  margin-top: 40vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: 3.875rem;
  padding-right: 3.875rem;
  width: calc(66.66667% + 3rem);
  border-radius: var(--panel-radius);
  position: relative;
  z-index: 1;
  pointer-events: none;
  /* // Chrome fix https://stackoverflow.com/a/28906246/955917 */
  -webkit-transform: translate3d(0, 0, 0);
}
:global(:where(.is-legacy)) .st-panel {
  --panel-radius: 2px;
  --panel-opacity: var(--color-panel-opacity, 1);
  --panel-filter: var(--color-panel-filter, none);
}
.st-panel.first {
  margin-top: 100vh;
}
.st-panel.last {
  margin-bottom: 100vh;
}
.st-panel::before {
  content: "";
  background-color: var(--panel-background);
  opacity: var(--panel-opacity);
  border-radius: var(--panel-radius);
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.st-panel::after {
  content: "";
  display: table;
  clear: both;
}
.st-panel :global(> *) {
  font-family: ABCSerif, Book Antiqua, Palatino Linotype, Palatino, serif;
  font-size: 1.375rem;
  line-height: 1.666666667;
  color: var(--panel-color);
  margin-top: 0;
  margin-left: auto !important;
  margin-right: auto !important;
  pointer-events: all;
}
.st-panel :global(> *):last-child {
  margin-bottom: 0;
}
.st-panel > :global(img) {
  max-width: 66%;
  display: block;
  margin: auto;
  height: auto;
}

@media only screen and (min-width: calc(61.25rem + 1px)) {
  :global(.right) {
    margin-right: calc(30% - 16rem) !important;
    width: 32rem !important;
  }
  :global(.left) {
    margin-left: calc(30% - 16rem) !important;
    width: 32rem !important;
  }
}
@media only screen and (max-width: 61.25rem) {
  .st-panel {
    width: auto !important;
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .st-panel :global(p) {
    font-size: 1.125rem;
    line-height: 1.555555556;
  }
}</style>
