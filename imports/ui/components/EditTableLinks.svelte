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

  let sortable;
  let example1;

  setTimeout(function () {
    console.log(example1);
    sortable = new Sortable(example1, {
      animation: 150,
      ghostClass: 'blue-background-class',
      onEnd: () => {
        Test();
      },
    });
  }, 3000);

  function Test() {
    console.log(sortable);
    console.log(links);
    links.forEach((link) => {});
  }

</script>

<div twoLine bind:this={example1}>
  {#each links as mezigLink, linkIndex}
    {#if linkIndex !== links.length - 1}{/if}
    <div data-value={linkIndex} class="div-link">
      <EditLink {mezigLink} {linkIndex} on:deleteLink={deleteLink} on:updateLink />
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
  .div-link {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }

</style>
