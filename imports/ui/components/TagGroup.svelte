<script>
  import { _ } from 'svelte-i18n';
  import { Icon } from '@smui/button';

  import Tag from './Tag.svelte';

  export let skillsTab;

  let expend = false;
  let tabSkill;

  $: {
    if (expend) {
      tabSkill = $skillsTab;
    } else {
      tabSkill = $skillsTab.slice(0, 10);
    }
  }
  function calcFontSize(skillUseNumber) {
    if (expend) {
      const max = tabSkill[0].count;
      let fontSize = (skillUseNumber / max) * 2;
      fontSize = fontSize.toFixed(2);
      if (fontSize <= 1) fontSize = 1;
      return `${fontSize}em`;
    } else {
      return '1.5em';
    }
  }
</script>

<div class="divContainer">
  {#each tabSkill as skill}
    <Tag
      skill={`#${skill.name}`}
      on:clickSkills
      textTooltip={`${$_('ui.tags.useNumber')} : ${skill.count}`}
      fontSizeProperty={calcFontSize(skill.count)}
    />
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
