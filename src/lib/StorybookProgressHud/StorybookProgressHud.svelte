<script lang="ts">
  /**
   * @file
   * A component to show the progress of the scrollyteller in Storybook.
   * This is not a production component.
   */
  interface Props {
    scrollPct: number;
    panelPct: number;
    panelIndex?: number;
    totalPanels?: number;
  }

  let {
    scrollPct = 0,
    panelPct = 0,
    panelIndex = 0,
    totalPanels,
  }: Props = $props();

  let panelLabel = $derived.by(() => {
    if (panelIndex === -1) return "Prelude";
    if (totalPanels !== undefined && panelIndex >= totalPanels) return "Outro";
    return `Panel ${panelIndex + 1}`;
  });
</script>

<div class="storybook-hud">
  <span>Overall scroll ({Math.round(scrollPct * 100)}%)</span>
  <progress value={Math.min(1, Math.max(0, scrollPct))} max="1"></progress>
  <span>{panelLabel} ({Math.round(panelPct * 100)}%)</span>
  <progress value={Math.min(1, Math.max(0, panelPct))} max="1"></progress>
</div>

<style>
  .storybook-hud {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: ABCSans, sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.75);
    color: #ffffff;
    border-radius: 0.5rem;
    width: 220px;
    box-sizing: border-box;
    z-index: 10;
  }

  progress {
    width: 100%;
    height: 16px;
    accent-color: #ffffff;
  }
</style>
