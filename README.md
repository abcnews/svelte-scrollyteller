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

When a new box comes into view the `onMarker` callback will fire with the `data` of the incoming panel.

```svelte
<script lang="ts">
	import Scrollyteller from '@abcnews/svelte-scrollyteller';
	import MyGraphic from 'MyGraphic.svelte';

  let {panels} = $props();
  let marker = $state(0);
  let progress = $state();

</script>

<Scrollyteller
	{panels}
	onMarker={(data) => {
		marker = data;
	}}
	onProgress={(type, payload) => {
		progress = payload;
	}}
  layout={{
    align: 'left',
    // resizeInteractive: true
    // transparentFloat: true
  }}
>
	<MyGraphic {marker} />
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

| Property        | Type                     | Description                                                                                                                            | Default            |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| panels          | `PanelDefinition[]`      | **required** Array of nodes and data which dictate the markers                                                                         |
| onMarker        | `(data: Data) => void`   | **required** Called when a marker intersects and returns that markers `data`                                                           |                    |
| onProgress      | `(type, payload) => void`| Fires on scroll and returns the scrollyteller progress. payload is `{ boundingRect, rootPct, scrollPct }`                              |                    |
| onLoad          | `(el: HTMLElement) => void`| Called when the interactive graphic mount node is ready.                                                                             |                    |
| customPanel     | Svelte Component         | Component to replace the default panel component                                                                                       | Panel.svelte       |
| observerOptions | IntersectionObserverInit | Options for the intersection observer. Refer to the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | `{threshold: 0.5}` |

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

const scrollyData = loadScrollyteller<MyPanelData>(
  "", // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount node u-full makes it full width in Odyssey
  "mark", // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

mount(App, {
  target: scrollyData.mountNode,
  props: { panels: scrollyData.panels },
});
```

## Usage with other non-Svelte frameworks

The scrollyteller is available as a Web Component for use in other frameworks. See [README.WebComponent.md](README.WebComponent.md) for more info.

## Development

The Svelte components are [packaged using SvelteKit svelte-package](https://kit.svelte.dev/docs/packaging).

The Web Component is built separately using Vite with the `vite-webcomponents.config.js` config.

Add `#debug=true` to your story to enable debug mode and clearly outline each section, block, breakpoint, and observer trigger point.

### Get started

```sh
git clone git@github.com:abcnews/svelte-scrollyteller.git
cd svelte-scrollyteller
npm i
npm run dev
```

This will get a SvelteKit app to use for development and testing up and running.

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
