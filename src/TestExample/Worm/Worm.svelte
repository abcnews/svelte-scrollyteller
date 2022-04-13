<script>
  import worm from './worm.svg';
</script>

<div class="wrapper">
  <div class="text"><slot /></div>
  <img src={worm} alt="" />
</div>

<style lang="scss">
  img {
    width: 240px;
    height: auto;
  }

  .wrapper {
    position: relative;
    display: flex;
    margin: auto;
  }

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: xx-large;
    font-weight: 900;
  }
</style>
