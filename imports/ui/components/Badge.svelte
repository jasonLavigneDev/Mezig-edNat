<script lang="ts">
// Text in the badge
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
  <div class="badge-container">
    <span class="badge-slot">
      <slot />
    </span>
    <div
      class="badge"
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
  .badge-container {
    position: relative;
    display: inline-block;
    z-index: 5;
  }

  .badge {
    position: absolute;
    font-family: inherit;
    display: inherit;
    white-space: nowrap;
    font-size: xx-small;

    color: white;
    background-color: coral;
    border-radius: 100em;
    padding: 2px;
  }

  .badge.top {
    left: 50%;
    transform: translate(-50%, -100%);
    margin-top: -8px;
  }

  .badge.bottom {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    margin-bottom: -8px;
  }

  .badge.left {
    left: 0;
    transform: translateX(-100%);
    margin-left: -8px;
  }

  .badge.right {
    right: 0;
    transform: translateX(100%);
    margin-right: -8px;
  }

  .badge.topRight {
    right: 0;
    top: 0;
    margin-top: -10px;
  }

  .badge.topLeft {
    left: 0;
    transform: translate(-80%, -100%);
  }

  .badge.bottomRight {
    right: 0;
    bottom: 0;
    margin-top: 50px;
  }

  .badge.bottomLeft {
    left: 0;
    transform: translate(-80%, 100%);
    margin-top: -12px;
  }
</style>