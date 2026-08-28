<script lang="ts">
  interface Props {
    /** Overall scrollyteller scroll percentage (0 to 1) */
    scrollPct: number;
    /** Current panel scroll percentage (0 to 1) */
    panelPct: number;
    /** Current active panel index (-1 for prelude, 0, 1, 2...) */
    panelIndex?: number;
    /** Total number of real panels */
    totalPanels?: number;
    /** Text and bar foreground colour */
    colour?: string;
  }

  let {
    scrollPct = 0,
    panelPct = 0,
    panelIndex = 0,
    totalPanels,
    colour = "#000000",
  }: Props = $props();

  let isLightText = $derived(
    colour.toLowerCase() === "#ffffff" ||
      colour.toLowerCase() === "white" ||
      colour.toLowerCase() === "#fff",
  );

  let panelLabel = $derived.by(() => {
    if (panelIndex === -1) return "Prelude Progress";
    if (totalPanels !== undefined && panelIndex >= totalPanels)
      return "Outro Progress";
    return `Panel ${panelIndex + 1} Progress`;
  });
</script>

<div
  class="progress-hud"
  style:border-color={isLightText
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(0, 0, 0, 0.15)"}
>
  <div class="progress-section">
    <div class="progress-labels">
      <span class="progress-title" style:color={colour}>Overall Scroll</span>
      <span class="progress-value" style:color={colour}>
        {Math.round(scrollPct * 100)}%
      </span>
    </div>
    <div
      class="progress-bar-container"
      style:background={isLightText
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.15)"}
    >
      <div
        class="progress-bar"
        style:background={colour}
        style:width="{Math.min(100, Math.max(0, Math.round(scrollPct * 100)))}%"
      ></div>
    </div>
  </div>

  <div class="progress-section">
    <div class="progress-labels">
      <span class="progress-title" style:color={colour}>{panelLabel}</span>
      <span class="progress-value" style:color={colour}>
        {Math.round(panelPct * 100)}%
      </span>
    </div>
    <div
      class="progress-bar-container"
      style:background={isLightText
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.15)"}
    >
      <div
        class="progress-bar"
        style:background={colour}
        style:width="{Math.min(100, Math.max(0, Math.round(panelPct * 100)))}%"
      ></div>
    </div>
  </div>
</div>

<style lang="scss">
  .progress-hud {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.75rem;
    padding: 0.75rem 1.25rem;
    width: calc(100% - 3rem);
    max-width: 260px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    z-index: 3;
    font-family: ABCSans, sans-serif;
  }

  .progress-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1;
  }

  .progress-title {
    opacity: 0.85;
  }

  .progress-value {
    opacity: 0.95;
  }

  .progress-bar-container {
    border-radius: 1rem;
    height: 0.35rem;
    width: 100%;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.1s ease-out;
  }
</style>
