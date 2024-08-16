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

The scrollyteller takes a series of **panels** of content nodes and turns them into a series of elements which scroll over the `<Scrollyteller>` component's children.

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

When a new box comes into view the `on:marker` event will fire with the `data` of the incoming panel.

```html
<script lang="ts">
	import Scrollyteller from '@abcnews/svelte-scrollyteller';
	import UpdatableGraphic from 'UpdatableGraphic.svelte';

	export let panels;

	let marker = 0;
	let progress;

	const markerChangeHandler = ({ detail }) => {
		marker = detail;
	};

	const progressChangeHandler = ({ detail }) => {
		progress = detail;
	};
</script>

<Scrollyteller
	{panels}
	on:marker="{markerChangeHandler}"
	onProgress="{true}"
	on:progress="{progressChangeHandler}"
>
	<UpdatableGraphic marker="{marker}" />
</Scrollyteller>
```

For a more complete example using Typescript see the [examples](examples).

## Props

| Property        | Type                     | Description                                                                                                                            | Default          |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| panels          | Refer to **Usage**       | **required** Array of nodes and data which dictate the markers                                                                         |
| on:marker       | event emitter            | **required** Called when a marker intersects and returns that markers `data`                                                           |                  |
| on:progress     | event emitter            | Event fires on scroll and returns the scrollyteller progress                                                                           |                  |
| onProgress      | boolean                  | Boolean to enable the on:progress event. This is a somewhat heavy operation, so we don't enable it by default.                         |                  |
| customPanel     | Svelte Component         | Component to replace the default panel component                                                                                       | Panel.svelte     |
| observerOptions | IntersectionObserverInit | Options for the intersection observer. Refer to the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | {threshold: 0.5} |

## Changing styles

The scrollyteller inherits the [light/dark colour scheme from Odyssey](https://master-news-web.news-web-developer.presentation-layer.abc-prod.net.au/news/2024-08-16/odyssey-producers-documentation--everything-else/8676886), and applies the background colour set with the `--bg` variable.

The Svelte Scrollyteller also uses the following CSS variables that you can set anywhere in the DOM above the scrollyteller:

| Attribute               | Variable to use            | Fallback value                              |
| ----------------------- | -------------------------- | ------------------------------------------- |
| `background-color`      | `--color-panel-background` | `var(--od-colour-theme-surface-over-image)` |
| Text `colour`           | `--color-panel-text`       | `var(--od-colour-text-primary)`             |
| Background `opacity`    | `--color-panel-opacity`    | `.7`                                        |
| Background CSS `filter` | `--color-panel-filter`     | `blur(0.3125rem)`                           |

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

```js
import { loadScrollyteller } from '@abcnews/svelte-scrollyteller';
import App from 'App.svelte';

const scrollyData = loadScrollyteller(
	'', // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
	'u-full', // Class to apply to mount point u-full makes it full width in Odyssey
	'mark' // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

new App({
	target: scrollyData.mountNode,
	props: { panels: scrollyData.panels }
});
```

## Usage with other non-Svelte frameworks

The scrollyteller is available as a Web Component for use in other frameworks. See [README.WebComponent.md](README.WebComponent.md) for more info.

## Development

The Svelte components are [packaged using SvelteKit svelte-package](https://kit.svelte.dev/docs/packaging).

The Web Component is built separately using Vite with the `vite-webcomponents.config.js` config.

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
