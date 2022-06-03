<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { searchingStore } from '../../stores/stores';

  export let skill;
  export let textTooltip = '';
  const dispatch = createEventDispatcher();

  $: inSearch = $searchingStore.toLowerCase().split(' ').includes(skill.toLowerCase());

  function addSelectedTag(tag) {
    searchingStore.set(`${$searchingStore} ${tag}`);
  }

  function removeSelectedTag(tag) {
    searchingStore.set(
      $searchingStore
        .split(' ')
        .filter((v) => v.toLowerCase() !== tag.toLowerCase())
        .join(' '),
    );
  }

  function clickSkills() {
    if (inSearch) {
      removeSelectedTag(skill);
    } else {
      addSelectedTag(skill);
    }
    dispatch('clickSkills');
  }
</script>

<button
  on:click|stopPropagation={clickSkills}
  title={textTooltip}
  class="buttonTagsStyle"
  style={inSearch ? 'color: #f4a711;' : 'color: #212f74;'}
>
  {skill}
</button>

<style>
  .buttonTagsStyle {
    color: #f4a711;
    border: none;
    font-size: large;
    color: #212f74;
    background-color: transparent;
    cursor: pointer;
  }
  .buttonTagsStyle:hover {
    background-color: transparent;
    border: 1px solid orange;
    border-radius: 10px;
  }
  .buttonTagsStyle:focus {
    color: orange;
    background-color: transparent;
  }
</style>
