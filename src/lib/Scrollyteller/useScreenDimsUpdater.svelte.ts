import { getContext } from "svelte";
import type { Writable } from "svelte/store";

interface ScreenDimsUpdaterProps {
  get align(): string;
  get mobileVariant(): string;
}

export function useScreenDimsUpdater(props: ScreenDimsUpdaterProps) {
  const globalAlign = getContext<Writable<string>>("globalAlign");
  const screenDims = getContext<Writable<number[]>>("screenDims");
  const globalMobileVariant = getContext<Writable<string>>("mobileVariant");

  let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 0);
  let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);

  $effect(() => {
    const handleResize = () => {
      innerWidth = window.innerWidth;
      innerHeight = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  $effect(() => {
    screenDims.set([innerWidth, innerHeight]);
  });
  $effect(() => {
    globalAlign.set(props.align || "centre");
  });
  $effect(() => {
    globalMobileVariant.set(props.mobileVariant || "blocks");
  });
}
