<script>
  export let percentage;
</script>

<div class="top-left">
  <span>{percentage}%</span>
</div>

<div class="top-right">
  <span>{percentage}%</span>
</div>

<div class="bottom-left">
  <span>{percentage}%</span>
</div>

<div class="bottom-right">
  <span>{percentage}%</span>
</div>

<style lang="scss">
  .top-left {
    border-top: 5px solid white;
    border-left: 5px solid white;
    top: 0;
    left: 0;
  }

  .top-right {
    border-top: 5px solid white;
    border-right: 5px solid white;
    top: 0;
    right: 0;
  }

  .bottom-right {
    border-bottom: 5px solid white;
    border-right: 5px solid white;
    bottom: 0;
    right: 0;
  }

  .bottom-left {
    border-bottom: 5px solid white;
    border-left: 5px solid white;
    bottom: 0;
    left: 0;
  }

  div {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    font-family: ABCSans, sans-serif;

    span {
      color: white;
      font-size: large;
      font-weight: 900;
    }
  }
</style>
