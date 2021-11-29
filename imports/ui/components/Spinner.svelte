<script>
  import SvelteSpinner from 'svelte-spinner';
  export let color = '#011caa';
  export let size = 50;
  export let speed = 750;
  export let thickness = 2;
  export let gap = 40;
  export let full = true;
</script>

<style>
  .spinnerfull {
    position: 'absolute';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
    padding: 50% 50%;
  }
  .spinnerdiv {
    width: '100%';
    margin-top: 60;
    text-align: 'center';
  }
</style>

<div class={full ? 'spinnerfull' : 'spinnerdiv'}>
  <SvelteSpinner {size} {speed} {thickness} {gap} {color} />
</div>
