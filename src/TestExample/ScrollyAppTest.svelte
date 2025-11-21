<script lang="ts">
  import Scrollyteller, { loadScrollyteller } from "$lib/index.js";
  import PercentageIndicators from "./PercentageIndicators.svelte";
  import Worm from "./Worm/Worm.svelte";
  interface Props {
    name?: string;
    [key: string]: any;
  }

  let { name = "test", ...rest }: Props = $props();

  const scrollyData = loadScrollyteller(
    name, // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
    "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
    "mark" // Name of marker in CoreMedia eg. for "point" use #point default: #mark
  );

  let number = $state(0);
  let stProgress = $state();

  const onMarker = (detail) => {
    console.log({ detail });
    number = detail.number;
  };

  const onProgress = (detail) => {
    stProgress = detail;
  };
</script>

<Scrollyteller panels={scrollyData.panels} {onMarker} {onProgress} {...rest}>
  <div class="example-graphic">
    <Worm />
    <span class="number">{number}</span>
    <PercentageIndicators
      percentage={Math.round(stProgress?.scrollPct * 100)}
    />
  </div>
</Scrollyteller>

<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>
<p>After</p>

<style lang="scss">
  @use "../lib/breakpoints.scss" as breakpoints;
  .example-graphic {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    @media (min-width: breakpoints.$breakpointTablet) {
      background: pink;
    }
    @media (min-width: breakpoints.$breakpointLargeTablet) {
      background: orange;
    }
    @media (min-width: breakpoints.$breakpointDesktop) {
      background: red;
    }
    @media (min-width: breakpoints.$breakpointLargeDesktop) {
      background: purple;
    }
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 900;
    font-size: xx-large;
  }
</style>
