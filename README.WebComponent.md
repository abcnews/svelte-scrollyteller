# Svelte Scrollyteller Web Component

While the Svelte Scrollyteller is provided for use in Svelte projects, a Web Component build is provided for use in non-svelte projects like React or native JS.

This documentation assumes you know how to bootstrap a Svelte Scrollyteller in a Svelte project (see [README.md](README.md));

## Low level usage

Import the Web Component into your project with:

```js
/** @ts-ignore import self-executes so abcnews-scrollyteller available as an element */
import { Scrollyteller, loadScrollyteller} from '@abcnews/svelte-scrollyteller/wc';
```

Then use the component like so:

```html
<abcnews-scrollyteller
    className="someClass"
    panelClassName="panelClass"
    firstPanelClassName="firstPanelClass"
    lastPanelClassName="lastPanelClass" />
```

Since we can't pass complex types to Web Components, we must set panels manually with Javascript:

```js
const current = document.querySelector('abcnews-scrollyteller');

// In Odyssey these would be generated with `loadScrollyteller()`
current.panels = [
    {
        data: {customData: 'red'},
        nodes: Object.assign(document.createElement('p'), {innerText: 'Hello world'}),
    },
    {
        data: {customData: 'green'},
        nodes: Object.assign(document.createElement('p'), {innerText: 'This is the second panel'}),
    },
];
```

For backward compatibility the Web Component doesn't use shadow dom, so your app can override styles. This means slots don't work as expected, so you must manually insert child nodes into the `graphicRootEl`.

The component emits a `load` and `marker` event, so you can use both to initialise and update child nodes:

```js
current.addEventListener('load', () => current.graphicRootEl.appendChild(myGraphics));
current.addEventListener('marker', e => myGraphics.style.background = e.detail.customData);
```

Custom panels are not supported in the Web Component.

## Usage in React

You can use the following boilerplate component to handle this for you. Continue bootstrapping panels with `loadScrollyteller` as you would in a Svelte project (see [README.md](README.md)), then use this wrapper component to interface with the Web Component:

```tsx
/** @ts-ignore import self-executes so abcnews-scrollyteller is available as an element */
import Scrollyteller from '@abcnews/svelte-scrollyteller/wc';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function ScrollytellerPortalChild({ domNode, children }) {
  if (!domNode) {
    return null;
  }
  return createPortal(children, domNode);
}

export default function ScrollytellerWebComponent({ children, panels, styles, onMarker }) {
  const scrollyEl: typeof Scrollyteller.element = useRef();
  const [scrollyPortal, setScrollyPortal] = useState();

  useEffect(() => {
    const { current } = scrollyEl;
    if (!current) return;
    current.panels = panels;
    current.addEventListener('load', () => setScrollyPortal(current.graphicRootEl));
    current.addEventListener('marker', e => onMarker(e.detail));
  }, [scrollyEl]);

  return (<>
    <ScrollytellerPortalChild domNode={scrollyPortal}>
      {children}
    </ScrollytellerPortalChild>
    <abcnews-scrollyteller
      ref={scrollyEl}
      className={styles.scrollyteller}
      panelClassName={styles.panel}
      firstPanelClassName={styles.firstPanel}
      lastPanelClassName={styles.lastPanel} />
  </>);
}
```