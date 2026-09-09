# Svelte Scrollyteller

A scrollyteller component for Svelte.
Svelte port of the ABC News [React Scrollyteller](https://github.com/abcnews/scrollyteller).

## Installation

`npm install @abcnews/svelte-scrollyteller`

Add aunty config to `package.json`:

```json
"aunty": {
  "type": "svelte",
  "build": {
    "entry": [
      "index"
    ],
    "includedDependencies": [
      "@abcnews/svelte-scrollyteller"
    ]
  }
}
```

## Usage

The scrollyteller takes an array of **panels** of content nodes and turns them into a series of elements which scroll over the `<Scrollyteller>` component's children.

The `panels` prop is in the format of:

    [
      {
        data: {
          info: 'Any arbitrary data, returned to you when this marker is active'
        },
        align: 'left', // optional: align the panels to the left or right
        panelClass: 'my-custom-target', // optional: in case you want to style it manually
        nodes: [<DOM elements for this panel>]
      },
      {
        data: {
          thing: 'Config when this second marker is hit'
        },
        nodes: [<DOM elements for this panel>]
      }
    ]

When a new box comes into view, the active `marker` and `currentPanel` update automatically via Svelte 5 two-way bindings.

```svelte
<script lang="ts">
  import Scrollyteller from '@abcnews/svelte-scrollyteller';
  import MyGraphic from './MyGraphic.svelte';

  let { panels } = $props();
  let currentPanel = $state(0);
  let virtualPanel = $state(-1);
  let marker = $state();
  let panelPct = $state(0);
  let scrollPct = $state(0);
</script>

<Scrollyteller
  {panels}
  bind:currentPanel
  bind:virtualPanel
  bind:marker
  bind:panelPct
  bind:scrollPct
  layout={{
    align: 'left',
    // resizeInteractive: false
    // transparentFloat: true
  }}
>
  <MyGraphic {marker} {panelPct} {scrollPct} />
</Scrollyteller>

<style lang="scss">
// Optionally create a ratio box for your graphic. It will self-centre itself
// into the appropriate space when resizeInteractive=true
.myGraphic {
  aspect-ratio: 16/9;
  height: 100%;
  width: unset;
  @container (max-aspect-ratio:16/9) {
    width: 100%;
    height: auto;
  }
}
</style>
```

### Upgrading from previous versions

Previous versions used callback functions (`onMarker` and `onProgress`). In v5+, these are replaced with native Svelte 5 two-way bindings (`bind:`).

1. Replace `onMarker={(data) => marker = data}` with `bind:marker`.
2. Replace `onProgress={(type, payload) => ...}` with `bind:scrollPct`, `bind:panelPct`, `bind:rootPct`, `bind:currentPanel`, or `bind:virtualPanel`.

For a more complete example using Typescript see the [examples](examples).

### TypeScript Types

You can import the following types to help with your implementation:

```ts
import type {
  PanelDefinition,
  ScrollytellerDefinition,
} from "@abcnews/svelte-scrollyteller";

/**
 * Your custom marker data type
 */
type MyPanelData = {
  datawrapperUrl: string;
};

/**
 * A typed list of panels
 */
const panels: PanelDefinition<MyPanelData>[] = [...];
```

## Props

| Property           | Type                        | Description                                                                                                                         | Default      |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| panels             | `PanelDefinition[]`         | **required** Array of nodes and data which dictate the markers                                                                      |              |
| currentPanel       | `number` (`$bindable`)      | Clamped active panel index (`0..N-1`), guaranteed safe for indexing panel arrays.                                                   | `0`          |
| virtualPanel       | `number` (`$bindable`)      | Raw lifecycle panel index (`-1` during prelude, `0..N-1` for panels, `N` for outro).                                                | `-1`         |
| marker             | `Data` (`$bindable`)        | The active panel's `data` payload (`undefined` during prelude and outro).                                                           | `undefined`  |
| panelPct           | `number` (`$bindable`)      | Progress percentage through the active panel or prelude/outro (`0.0` to `1.0`).                                                     | `0`          |
| scrollPct          | `number` (`$bindable`)      | Overall scroll progress through the scrollyteller (unclamped: `<0` before entry, `0.0..1.0` through interactive, `>1` after unpin). | `0`          |
| scrollDelta        | `number` (`$bindable`)      | Diff in pixels between previous scroll event, useful for determining velocity/chunky scroll wheel vs smooth trackpad.               | `0`          |
| rootPct            | `number` (`$bindable`)      | Viewport coverage percentage (`0.0` to `1.0`).                                                                                      | `0`          |
| onLoad             | `(el: HTMLElement) => void` | Called when the interactive graphic mount node is ready.                                                                            |              |
| customPanel        | Svelte Component            | Component to replace the default panel component                                                                                    | Panel.svelte |
| vizMarkerThreshold | number                      | Percent past the bottom of the viewport the panel has to hit before triggering.                                                     | `20`         |

## Using layouts/styling your own

The `layout={}` prop controls how the scrollyteller is laid out, and has the following options:

| Property          | Type    | Description                                                                                                                                                          |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align             | string  | Alignment for blocks. One of left/right/centre/none. "none" applies no breakpoint styling so you can do your own custom styles.                                      |
| resizeInteractive | boolean | Defaults to `true` if not set. This handles the scrollyteller graphic position according to the current breakpoint.                                                  |
| transparentFloat  | boolean | Defaults to `true` if `align` is left or right. Removes the block background for left/right aligned pieces, for a better reading experience.                         |
| mobileVariant     | string  | Toggle mobile betwen:<br/><ul><li>blocks: traditional block layout scrolling over the viz</li><li>rows: split screen layout with viz on top and text below</li></ul> |

The resizeInteractive prop lets you opt into predefined graphic sizes and placements. When enabled, the graphic will appear toward the top on mobile, and in the centre when left/right aligned. On mobile this allows the most space for blocks to scroll without hitting the graphic, and looks aesthetically pleasing on desktop/larger portrait tablets like the iPad Pro.

The graphic slot has `position:relative` set, uses flexbox to put its contents into the correct spot, and allows you to use container queries to size your interactive. This works best when your interactive fits itself to its container and reserves only the space it needs. See the examples above for some example code using `aspect-ratio` to fit an interactive to the graphic slot, although you could use any number of methods.

You can opt out of the resizeInteractive behaviour if you want to use your own styles, at which point you can take over the entire screen.

## Changing block styles

The scrollyteller inherits the [light/dark colour scheme from Odyssey](https://master-news-web.news-web-developer.presentation-layer.abc-prod.net.au/news/2024-08-16/odyssey-producers-documentation--everything-else/8676886).

The Svelte Scrollyteller also uses the following CSS variables that you can set anywhere in the DOM above the scrollyteller:

| Attribute               | Variable to use            | Fallback value          |
| ----------------------- | -------------------------- | ----------------------- |
| `background-color`      | `--color-panel-background` | dark/light mode variant |
| Text `colour`           | `--color-panel-text`       | dark/light mode variant |
| Background `opacity`    | `--color-panel-opacity`    | `1`                     |
| Background CSS `filter` | `--color-panel-filter`     | `blur(2.5px)`           |
| Background `border`     | `--color-panel-border`     | `none`                  |

You can also specify a panelClass class and style the panels manually (see Usage above).

## Usage with Odyssey

When developing [ABC News](https://www.abc.net.au) stories with [Odyssey](https://github.com/abcnews/odyssey) you can use the `loadScrollyteller` function to gather `panels` within a CoreMedia article.

See a more complete [usage example with Odyssey](examples/aunty).

CoreMedia text:

```
#scrollytellerVARIABLEvalue
This is the opening paragraph panel
#markVARIABLEvalue
This is a second panel
#markVARval
This is another paragraph
#endscrollyteller
```

JS Code:

```ts
import { mount } from "svelte";
import { selectMounts } from "@abcnews/mount-utils";
import { loadScrollyteller } from "@abcnews/svelte-scrollyteller";
import App from "App.svelte";

/**
 * Optionally, specify generics to type your markers.
 *
 * @example
 * // In App.svelte:
 * import type { PanelDefinition } from "@abcnews/svelte-scrollyteller";
 * let { panels }: { panels: PanelDefinition<MyPanelData>[] } = $props();
 */
export type MyPanelData = {
  electorate: string;
  viz: "map" | "hex" | "chart";
};

// Find all scrollyteller mount nodes
const scrollyMounts = selectMounts("scrollytellerNAMEmyscrolly");

scrollyMounts.forEach((mountNode) => {
  // Initialise the scrollyteller using the target node directly
  const scrollyData = loadScrollyteller<MyPanelData>(
    mountNode,
    "u-full", // Class to apply to mount node u-full makes it full width in Odyssey
    "mark", // Name of marker in CoreMedia eg. for "point" use #point default: #mark
  );

  mount(App, {
    target: scrollyData.mountNode,
    props: { panels: scrollyData.panels },
  });
});
```

## Development

The Svelte components are [packaged using SvelteKit svelte-package](https://kit.svelte.dev/docs/packaging).

Add `#debug=true` to your story to enable debug mode and clearly outline each section, block, breakpoint, and observer trigger point.

### Get started

```sh
git clone git@github.com:abcnews/svelte-scrollyteller.git
cd svelte-scrollyteller
npm i
npm run dev
```

This will run a storybook for development and testing.

### Releasing new versions

```sh
npm run release
```

This will:

- install dependences
- build
- test
- lint
- bump version
- commit
- publish to npm
