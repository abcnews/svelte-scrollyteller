<script lang="ts">
  import worm from './worm.svg';

  export let mark;
</script>

<div class="wrapper">
  <img src={worm} alt="" />
  <div class="number">{mark}</div>
</div>

<style lang="scss">
  .wrapper {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 240px;
    height: auto;
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ABCSerif, Book Antiqua, Palatino Linotype, Palatino, serif;
    font-size: xx-large;
    font-weight: 900;
    color: white;
  }
</style>
