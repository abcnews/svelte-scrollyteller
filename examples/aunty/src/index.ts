import { whenOdysseyLoaded } from '@abcnews/env-utils';
import App from './components/App/App.svelte';
import { loadScrollyteller } from 'svelte-scrollyteller';

let appMountEl;

whenOdysseyLoaded.then(() => {
  const scrollyData = loadScrollyteller(
    'test', // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
    'u-full', // Class to apply to mount point u-full makes it full width in Odyssey
    'mark' // Name of marker in CoreMedia eg. for "point" use #point default: #mark
  );

  appMountEl = scrollyData.mountNode;

  if (appMountEl) {
    new App({
      target: appMountEl,
      props: { scrollyData }
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[aunty] public path: ${__webpack_public_path__}`);
}
