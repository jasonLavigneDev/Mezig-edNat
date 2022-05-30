<script>
  import { _ } from 'svelte-i18n';
  import { Icon } from '@smui/button';

  import Tag from './Tag.svelte';

  export let skillsTab;
  let maxSkill;

  let expend = false;

  $: {
    if (expend) {
      maxSkill = skillsTab.length;
    } else {
      maxSkill = 10;
    }
  }
</script>

<div class="divContainer">
  {#each skillsTab.slice(0, maxSkill) as skill}
    <Tag skill={`#${skill[0]}`} on:clickSkills textTooltip={`${$_('ui.tags.useNumber')} : ${skill[1]}`} />
  {/each}
</div>
<button on:click={() => (expend = !expend)} class="iconButtonStyle">
  <Icon class="material-icons" style="font-size:xx-large; border: 1px solid orange; border-radius: 20px">
    {#if expend}
      expand_less
    {:else}
      expand_more
    {/if}
  </Icon>
</button>
<div class="dividerStyle" />

<style>
  .divContainer {
    width: 100%;
    text-align: center;
    text-justify: auto;
    margin-top: 10px;
  }
  .iconButtonStyle {
    border-radius: 10px;
    width: auto;
    border: none;
    background-color: #eceef8;
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .dividerStyle {
    border-bottom: 1px solid orange;
    width: 100%;
    margin-top: -40px;
  }
</style>
