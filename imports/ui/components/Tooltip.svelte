<script>
  export let id = null;

  // Text in the tooltip
  export let text = '';

  // Position compared to cursor
  export let top = false;
  export let bottom = false;
  export let left = false;
  export let right = false;

  export let topRight = false;
  export let topLeft = false;
  export let bottomRight = false;
  export let bottomLeft = false;
</script>

{#if text}
  <div class="tooltip-container">
    <span class="tooltip-slot">
      <slot />
    </span>
    <div
      class="tooltip"
      class:top
      class:bottom
      class:left
      class:right
      class:topRight
      class:topLeft
      class:bottomRight
      class:bottomLeft
      aria-label={text}
    >
      {text}
    </div>
  </div>
{/if}

<style>
  .tooltip-container {
    z-index: 5 !important;
    position: relative;
    display: inline-block;
  }

  .tooltip {
    position: absolute;
    font-family: inherit;
    display: inherit;
    white-space: nowrap;

    color: white;
    background-color: black;
    box-shadow: 0 0 0.5em black;
    border-radius: 0.5em;
    opacity: 0;

    visibility: hidden;

    padding: 10px;
  }

  .tooltip.top {
    left: 50%;
    transform: translate(-50%, -100%);
    margin-top: -8px;
  }

  .tooltip.bottom {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    margin-bottom: -8px;
  }

  .tooltip.left {
    left: 0;
    transform: translateX(-100%);
    margin-left: -8px;
  }

  .tooltip.right {
    right: 0;
    transform: translateX(100%);
    margin-right: -8px;
  }

  .tooltip.topRight {
    right: 0;
    transform: translate(80%, -100%);
  }

  .tooltip.topLeft {
    left: 0;
    transform: translate(-80%, -100%);
  }

  .tooltip.bottomRight {
    right: 0;
    transform: translate(80%, 100%);
    margin-top: -12px;
  }

  .tooltip.bottomLeft {
    left: 0;
    transform: translate(-80%, 100%);
    margin-top: -12px;
  }

  .tooltip-slot:hover + .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>
