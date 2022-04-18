<script lang="ts">
  import Worm from '../Worm/Worm.svelte';
  import Scrollyteller from 'svelte-scrollyteller';
  import PercentageIndicators from '../PercentageIndicators.svelte';

  export let scrollyData;

  let number = 0;
  let stProgress;

  const markerChangeHandler = marker => {
    console.log(marker);
    number = marker.number;
  };

  const progressChangeHandler = progress => {
    console.log(progress);
    stProgress = progress;
  };
</script>

<Scrollyteller panels={scrollyData.panels} onMarker={markerChangeHandler} onProgress={progressChangeHandler}>
  <div class="graphic">
    <Worm mark={number} />
    <PercentageIndicators percentage={stProgress?.scrollPct} />
  </div>
</Scrollyteller>

<style>
  .graphic {
    height: 100%;
    width: 100%;
    background-color: #03cfff;
    display: flex;
  }
</style>
