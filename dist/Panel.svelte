<script>import { getContext, onMount } from 'svelte';
import { children } from './actions.js';
const currentPanel = getContext('currentPanel');
const steps = getContext('steps');
export let align;
export let transparentFloat;
export let panelClass;
export let data;
export let nodes;
export let i = -1;
let panelRef;
onMount(() => {
    panelRef.scrollyData = data;
    $steps = [...$steps, panelRef];
});
</script>

<div
	data-align={align}
	data-index={i}
	class={`st-panel-root ${panelClass || ''}`}
	class:st-panel-root--left={align === 'left'}
	class:st-panel-root--right={align === 'right'}
	class:st-panel-root--centre={align === 'centre'}
	class:st-panel-root--transparent-blocks={transparentFloat}
	class:st-panel-root--active={i === $currentPanel}
	bind:this={panelRef}
>
	<div class="st-panel" use:children={nodes}></div>
</div>

<style>.st-panel-root {
  --panel-radius: 0.75rem;
  --panel-background: var(--color-panel-background, rgba(255, 255, 255, 0.95));
  --panel-color: var(--color-panel-text, #000);
  --panel-opacity: var(--color-panel-opacity, 1);
  --panel-filter: var(--color-panel-filter, blur(2.5px));
  --panel-border: var(--color-panel-border, 1px solid rgba(0, 0, 0, 0.15));
  --panel-padding: 1rem;
  /* How opaque do we make inactive panels on left/right aligned mode */
  --panel-opacity-inactive: var(--color-panel-opacity-inactive, 0.5);
  box-sizing: border-box;
  margin: 80vh auto;
  position: relative;
  z-index: 1;
  pointer-events: none;
}
@media (min-width: 46.5rem) {
  .st-panel-root {
    --panel-padding: 2rem;
  }
}
:global([data-scheme="dark"]) .st-panel-root, :global(.is-dark-mode) .st-panel-root {
  --panel-background: var(--color-panel-background, rgba(15, 15, 15, 0.95));
  --panel-color: var(--color-panel-text, #ebebeb);
  --panel-border: var(--color-panel-border, 1px solid rgba(255, 255, 255, 0.15));
}
:global(.scrollyteller--debug) .st-panel-root {
  outline: 5px solid limegreen;
}
.st-panel-root.first {
  margin-top: 100dvh;
}
.st-panel-root.last {
  margin-bottom: 50vh;
}
@media (min-width: 62rem) {
  .st-panel-root--left, .st-panel-root--right {
    margin-top: 30vh;
    margin-bottom: 30vh;
    opacity: 1;
  }
  .st-panel-root--left.st-panel-root--transparent-blocks.st-panel-root--active, .st-panel-root--right.st-panel-root--transparent-blocks.st-panel-root--active {
    opacity: 1;
  }
  .st-panel-root--left.st-panel-root--transparent-blocks, .st-panel-root--right.st-panel-root--transparent-blocks {
    --panel-filter: none;
    --panel-background: none;
    --panel-border: none;
    --panel-padding: 0;
    opacity: var(--panel-opacity-inactive);
  }
  .st-panel-root--left.first, .st-panel-root--right.first {
    margin-top: 50dvh;
  }
}
.st-panel {
  -webkit-backdrop-filter: var(--panel-filter);
  backdrop-filter: var(--panel-filter);
  color: var(--panel-color);
  border-radius: var(--panel-radius);
  padding: var(--panel-padding);
}
.st-panel::before {
  content: "";
  background-color: var(--panel-background);
  opacity: var(--panel-opacity);
  border-radius: var(--panel-radius);
  border: var(--panel-border);
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
  font-family: ABCSans, sans-serif;
  font-size: inherit;
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
}</style>
