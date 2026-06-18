<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Components/Scrollyteller",
    parameters: {
      layout: "fullscreen",
    },
    argTypes: {
      align: {
        control: "select",
        options: ["centre", "left", "right", "none"],
        description: "Alignment alignment of text panels.",
        table: { category: "Layout Config" },
      },
      mobileVariant: {
        control: "select",
        options: ["blocks", "rows"],
        description: "Layout on mobile viewports.",
        table: { category: "Layout Config" },
      },
      resizeInteractive: {
        control: "boolean",
        description: "Auto-scales graphic to fit viewport.",
        table: { category: "Layout Config" },
      },
      transparentFloat: {
        control: "boolean",
        description: "Removes panel backgrounds when left/right on desktop.",
        table: { category: "Layout Config" },
      },
      ratio: {
        control: { type: "number", min: 0.1, max: 3, step: 0.1 },
        description:
          "Graphic container target aspect ratio (we try, but don't guarantee this).",
        table: { category: "Layout Config" },
      },
      vizMarkerThreshold: {
        control: { type: "number", min: 0, max: 49 },
        description: "Marker trigger offset percentage.",
        table: { category: "Layout Config" },
      },
      scheme: {
        control: "select",
        options: ["light", "dark"],
        description:
          "Light or dark mode. Doesn't affect Scrollyteller, just the storybook.",
        table: { category: "Theme Config" },
      },
      colorPanelBackground: {
        control: "color",
        description: "--color-panel-background",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelText: {
        control: "color",
        description: "--color-panel-text",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelOpacity: {
        control: { type: "range", min: 0, max: 1, step: 0.05 },
        description: "--color-panel-opacity",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelFilter: {
        control: "text",
        description: "--color-panel-filter",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelBorder: {
        control: "text",
        description: "--color-panel-border",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelOpacityInactive: {
        control: { type: "range", min: 0, max: 1, step: 0.05 },
        description: "--color-panel-opacity-inactive",
        table: { category: "CSS Panel Customisation" },
      },
      colorPanelMargin: {
        control: "text",
        description: "--color-panel-margin",
        table: { category: "CSS Panel Customisation" },
      },
    },
  });
</script>

<script lang="ts">
  import Scrollyteller from "./Scrollyteller.svelte";
  import type { PanelDefinition } from "./types.js";
  import Worm from "./Worm/Worm.svelte";

  const createLoremParagraph = (index: number): Element[] => {
    if (typeof document === "undefined") return [];
    const lorem = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum at ex sit amet pretium. Phasellus vulputate sem vel convallis facilisis. Maecenas tristique pretium tempor.",
      "Sed vel nunc elementum, facilisis nisi quis, pretium quam. Mauris egestas pellentesque nibh, sit amet feugiat mauris rutrum et. Proin eget nisl at orci convallis egestas eget vitae massa.",
      "Praesent viverra arcu in mi porta varius. Curabitur vitae felis vitae arcu tincidunt tempor. Ut elementum metus ac tempor elementum. Vivamus finibus finibus lectus vel rhoncus.",
    ];
    const p = document.createElement("p");
    p.textContent = lorem[index % lorem.length];
    return [p];
  };

  interface MarkData {
    customdata: number;
    name: string;
  }

  // 6 vaguely DLS colour states
  const markerStates = [
    { name: "Mid Blue", bg: "#3E85E1", text: "#000000" },
    { name: "Light Blue", bg: "#A0BEEB", text: "#000000" },
    { name: "Green", bg: "#C2E4BF", text: "#000000" },
    { name: "Sand", bg: "#EBDECC", text: "#000000" },
    { name: "Purple", bg: "#C8BEEB", text: "#000000" },
  ];

  // Build the panels array matching the example structure
  const panels: PanelDefinition<MarkData>[] = markerStates.map((state, index) => ({
    data: { customdata: index + 1, name: state.name },
    nodes: createLoremParagraph(index),
  }));

  // Reactive states for the visualization
  let activeIndex = $state(0);
  let scrollProgress = $state(0);

  const handleMarker = (detail: MarkData) => {
    activeIndex = detail.customdata - 1;
  };

  const handleProgress = (type: string, payload: any) => {
    scrollProgress = payload.scrollPct;
  };

  // Svelte action to set body data-scheme attribute
  const schemeSetter = (node: HTMLElement, scheme: string) => {
    const update = (newScheme: string) => {
      if (typeof document !== "undefined") {
        document.body.setAttribute("data-scheme", newScheme || "light");
      }
    };
    update(scheme);
    return {
      update,
      destroy() {
        if (typeof document !== "undefined") {
          document.body.removeAttribute("data-scheme");
        }
      }
    };
  };
  // Helper to compile CSS variables only if they have values, preventing empty overrides
  const getStyleString = (args: any) => {
    const styles = [];
    if (args.colorPanelBackground) styles.push(`--color-panel-background: ${args.colorPanelBackground}`);
    if (args.colorPanelText) styles.push(`--color-panel-text: ${args.colorPanelText}`);
    if (args.colorPanelOpacity !== undefined && args.colorPanelOpacity !== null) styles.push(`--color-panel-opacity: ${args.colorPanelOpacity}`);
    if (args.colorPanelFilter) styles.push(`--color-panel-filter: ${args.colorPanelFilter}`);
    if (args.colorPanelBorder) styles.push(`--color-panel-border: ${args.colorPanelBorder}`);
    if (args.colorPanelOpacityInactive !== undefined && args.colorPanelOpacityInactive !== null) styles.push(`--color-panel-opacity-inactive: ${args.colorPanelOpacityInactive}`);
    if (args.colorPanelMargin) styles.push(`--color-panel-margin: ${args.colorPanelMargin}`);
    return styles.join(";");
  };
</script>

{#snippet defaultTemplate(args)}
  <span style="display: none;" use:schemeSetter={args.scheme}></span>
  <div style={getStyleString(args)}>
    <Scrollyteller
      {panels}
      layout={{
        align: args.align,
        mobileVariant: args.mobileVariant,
        resizeInteractive: args.resizeInteractive,
        transparentFloat: args.transparentFloat,
      }}
      ratio={args.ratio}
      vizMarkerThreshold={args.vizMarkerThreshold}
      onMarker={handleMarker}
      onProgress={handleProgress}
    >
      <div
        class="example-graphic"
        style="background: {markerStates[activeIndex].bg}; color: {markerStates[
          activeIndex
        ].text}; --worm: {markerStates[activeIndex].text};"
      >
        <Worm />
        <span class="number">{activeIndex + 1}</span>

        <!-- Scrollbar and progress indicator HUD -->
        <div
          class="progress-hud"
          style="border-color: {markerStates[activeIndex].text === '#ffffff'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.15)'};"
        >
          <div
            class="progress-bar-container"
            style="background: {markerStates[activeIndex].text === '#ffffff'
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.15)'};"
          >
            <div
              class="progress-bar"
              style="background: {markerStates[activeIndex]
                .text}; width: {Math.round(scrollProgress * 100)}%;"
            ></div>
          </div>
          <p
            class="progress-text"
            style="color: {markerStates[activeIndex].text};"
          >
            Scroll progress: {Math.round(scrollProgress * 100)}%
          </p>
        </div>
      </div>
    </Scrollyteller>
  </div>
{/snippet}

<Story
  name="Centre Aligned"
  args={{
    align: "centre",
    mobileVariant: "blocks",
    resizeInteractive: true,
    transparentFloat: false,
    ratio: 16 / 9,
    vizMarkerThreshold: 20,
    scheme: "light",
  }}
>
  {#snippet template(args)}
    {@render defaultTemplate(args)}
  {/snippet}
</Story>

<Story
  name="Left Aligned (Split Screen)"
  args={{
    align: "left",
    mobileVariant: "rows",
    resizeInteractive: true,
    transparentFloat: true,
    ratio: 1,
    vizMarkerThreshold: 20,
    scheme: "light",
  }}
>
  {#snippet template(args)}
    {@render defaultTemplate(args)}
  {/snippet}
</Story>

<style lang="scss">
  :global(body[data-scheme="light"]) {
    background-color: #ffffff;
    color: #000000;
    --color-panel-background: rgba(255, 255, 255, 0.95);
    --color-panel-text: #000000;
  }

  :global(body[data-scheme="dark"]) {
    background-color: #0d0d0d;
    color: #ffffff;
    --color-panel-background: rgba(15, 15, 15, 0.9);
    --color-panel-text: #ffffff;
  }

  .example-graphic {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    padding: 2rem;
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ABCSans, sans-serif;
    font-weight: 900;
    font-size: 3.5rem;
    color: inherit;
    z-index: 2;
  }

  .progress-hud {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 0.75rem 1.25rem;
    width: calc(100% - 4rem);
    max-width: 240px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;
  }

  .progress-bar-container {
    border-radius: 1rem;
    height: 0.4rem;
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.4rem;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.1s ease-out;
  }

  .progress-text {
    font-size: 0.8rem;
    margin: 0;
    font-weight: 700;
    opacity: 0.95;
  }
</style>
