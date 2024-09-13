<script>import { onMount } from 'svelte';
import { children } from './actions.js';
export let props;
const { align, transparentFloat, panelClass, data, nodes = [], steps = [] } = props;
let panelRef;
onMount(() => {
    panelRef.scrollyData = data;
    steps.push(panelRef);
});
</script>

<div
	data-align={align}
	class={`st-panel-root ${panelClass || ''}`}
	class:st-panel-root--left={align === 'left'}
	class:st-panel-root--right={align === 'right'}
	class:st-panel-root--centre={align === 'centre'}
	class:st-panel-root--transparent-blocks={transparentFloat}
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
  --panel-margin: 1rem;
  box-sizing: border-box;
  margin: 80vh auto;
  width: calc(100% - var(--panel-margin) * 2);
  position: relative;
  z-index: 1;
  pointer-events: none;
  font-size: 1.125rem;
}
@media (min-width: 46.5rem) {
  .st-panel-root {
    --panel-padding: 2rem;
    --panel-margin: 2rem;
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
  margin-bottom: 100vh;
}
@media (min-width: 62rem) {
  .st-panel-root--centre {
    max-width: 48.75rem;
    font-size: 1.875;
  }
}
@media (min-width: 90rem) {
  .st-panel-root--centre {
    max-width: 56.25rem;
  }
}
@media (min-width: 62rem) {
  .st-panel-root--left, .st-panel-root--right {
    --maxWidth: 45%;
    --panel-margin: 2rem;
    --panel-margin-inner: calc(var(--panel-margin) / 2);
    max-width: calc(var(--maxWidth) - (var(--panel-margin) + var(--panel-margin-inner)));
    margin: 30vh 0 30vh var(--panel-margin);
    font-size: 1.125rem;
  }
  .st-panel-root--left.st-panel-root--transparent-blocks, .st-panel-root--right.st-panel-root--transparent-blocks {
    --panel-filter: none;
    --panel-background: none;
    --panel-border: none;
    --panel-padding: 0;
  }
  .st-panel-root--left.first, .st-panel-root--right.first {
    margin-top: 50dvh;
  }
}
@media (min-width: 75rem) {
  .st-panel-root--left, .st-panel-root--right {
    --panel-margin: 3rem;
    --maxWidth: 40%;
    font-size: 1.125rem;
  }
}
@media (min-width: 90rem) {
  .st-panel-root--left, .st-panel-root--right {
    --panel-margin: 4rem;
    --maxWidth: 40%;
    font-size: 1.25rem;
  }
}
@media (min-width: 62rem) {
  .st-panel-root--right {
    margin: 15vh calc(var(--marginLeft) - 1rem) 15vh auto;
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
