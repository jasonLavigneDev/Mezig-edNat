<script>
  import { _ } from 'svelte-i18n';

  import Tag from './Tag.svelte';

  export let skillsTab;
</script>

<div class="divContainer">
  {#each skillsTab.slice(0, 10) as skill}
    <Tag skill={`#${skill[0]}`} on:clickSkills textTooltip={`${$_('ui.tags.useNumber')} : ${skill[1]}`} />
  {/each}
</div>

<style>
  .divContainer {
    width: 100%;
    text-align: center;
    text-justify: auto;
    margin-top: 10px;
  }
</style>
