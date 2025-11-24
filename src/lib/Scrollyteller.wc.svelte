<svelte:options
  customElement={{
    tag: "abcnews-scrollyteller",
    shadow: "none",
  }}
  accessors={true}
/>

<script>
  /**
   * @file
   * A Web Component export of the Svelte Scrollyteller.
   *
   * You should only use this in non-Svelte projects, such as older React
   * codebases that can't be updated.
   */
  import Scrollyteller from "./Scrollyteller.svelte";
  let { panels = [], layout = {}, ...rest } = $props();

  export { panels, layout };
</script>

{#if panels.length}
  <Scrollyteller {panels} {layout} {...rest}></Scrollyteller>
{/if}
