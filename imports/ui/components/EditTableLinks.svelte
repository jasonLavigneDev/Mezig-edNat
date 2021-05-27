<script>
  import { _ } from 'svelte-i18n';
  import List, { Separator } from '@smui/list/bare';
  import '@smui/list/bare.css';
  import EditLink from '../components/EditLink.svelte';
  import { Icon } from '@smui/chips/bare';
  import '@smui/chips/bare.css';
  import Sortable from 'sortablejs';

  export let links;

  const addLink = () => {
    links.push({ label: '', URL: '', isSocialNetwork: false, isPublic: true });
    links = links;
  };

  const deleteLink = (event) => {
    links.splice(event.detail.index, 1);
    links = links;
  };

  let example1;

  setTimeout(function () {
    console.log(example1);
    new Sortable(example1, {
      animation: 150,
      ghostClass: 'blue-background-class',
    });
  }, 3000);

</script>

<div twoLine bind:this={example1}>
  {#each links as mezigLink, linkIndex}
    <div>
      <EditLink {mezigLink} {linkIndex} on:deleteLink={deleteLink} on:updateLink />
      <Separator />
      {#if linkIndex !== links.length - 1}{/if}
    </div>
  {/each}
</div>

<div class="IconDiv">
  <span class="IconAddLink">
    <Icon
      on:click={addLink}
      title={$_('ui.editTableLinks.addLink')}
      class="material-icons"
      style="font-size: 3.5vmin;"
      trailing>add_circle_outline</Icon
    >
  </span>
</div>

<style>
  .IconAddLink {
    cursor: pointer;
  }
  .IconAddLink:hover {
    color: grey;
  }
  .IconDiv {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

</style>
