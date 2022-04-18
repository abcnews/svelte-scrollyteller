# Svelte Scrollyteller

A scrollyteller component for Svelte.
Svelte port of the ABC News [React Scrollyteller](https://github.com/abcnews/scrollyteller).

## Usage

The scrollyteller takes a series of **panels** of content nodes and turns them into a series of elements which scroll over the `<Scrollyteller>` component's children.

The `panels` prop is in the format of:

    [
      {
        data: {
          info: 'Some kind of config that is given when this marker is active'
        },
        nodes: [<DOM elements for this panel>]
      },
      {
        data: {
          thing: 'This will be given when the second marker is hit'
        },
        nodes: [<DOM elements for this panel>]
      }
    ]

When a new box comes into view `onMarker` will be called with the `data` of the incoming panel.

```html
<script lang="ts">
  import Scrollyteller from 'svelte-scrollyteller/Scrollyteller.svelte';
  import UpdatableGraphic from 'UpdatableGraphic.svelte'

  export let panels;

  let marker = 0;
  let progress;

  const markerChangeHandler = (data) => {
    marker = data;
  }

  const progressChangeHandler = (data) => {
    progress = data;
  }
</script>

<Scrollyteller
  {panels}
  onMarker={markerChangeHandler}
  onProgress={progressChangeHandler}
>
  <UpdatableGraphic marker={marker} />
</Scrollyteller>
```

For a more complete example using Typescript see the [examples](examples).

## Props

| Property  | Type | Description | Default |
| --- | --- | --- | --- |
| panels | Refer to **Usage** | **required** Array of nodes and data which dictate the markers |
| onMarker | (marker) => void | **required** Function which fires when a marker intersects and returns that markers data| |
| onProgress | (progress) => void | Function which fires when a on scroll and returns the scrollyteller progress |  |
| customPanel | Svelte Component | Component to replace the default panel component | Panel.svelte |
| observerOptions | IntersectionObserverInit | Options for the intersection observer. Refer to the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | {threshold: 0.5} |


### Usage with Odyssey

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
import { loadScrollyteller } from 'svelte-scrollyteller/utils';
import App from 'App.svelte';

const scrollyData = loadScrollyteller(
  "",       // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
  "mark"    // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

new App({
  target: scrollyData.mountNode,
  props: { panels: scrollyData.panels }
});
```

### Example

Mostly to aid development and demonstrate usage, there is an example project in `/examples`. It uses [aunty](https://github.com/abcnews/aunty) as the build tool to match the usual ABC News interactive development work flow.