<script>
  import { _ } from 'svelte-i18n';

  import Tag from './Tag.svelte';

  export let skillsTab;
</script>

<div class="divContainer">
  {#each skillsTab as skill}
    <span>
      <Tag skill={`#${skill[0]}`} on:clickSkills textTooltip={`${$_('ui.tags.useNumber')} : ${skill[1]}`} />
    </span>
  {/each}
</div>

<style>
  .divContainer {
    text-align: center;
  }
</style>
