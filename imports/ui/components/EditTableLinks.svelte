<script>
  import { _ } from 'svelte-i18n';
  import '@smui/list/bare.css';
  import EditLink from '../components/EditLink.svelte';
  import '@smui/chips/bare.css';
  import Sortable from 'sortablejs';
  import IconButton from '@smui/icon-button';
  import '@smui/icon-button/bare.css';

  export let links = [];
  export let sortableDiv = null;
  let sortable;

  const addLink = () => {
    links.push({ label: '', URL: '', isSocialNetwork: false, isPublic: true });
    links = links;
  };

  const deleteLink = (event) => {
    links.splice(event.detail.index, 1);
    links = links;
  };

  const initSortable = (sortEl) => {
    if (sortEl) {
      sortable = new Sortable(sortEl, {
        animation: 150,
        ghostClass: 'blue-background-class',
      });
    }
  };

  $: initSortable(sortableDiv);
</script>

<div twoLine bind:this={sortableDiv}>
  {#each links as mezigLink, linkIndex}
    <div id={linkIndex} class="div-link sortable">
      <EditLink {mezigLink} {linkIndex} on:deleteLink={deleteLink} on:updateLink />
    </div>
  {/each}
</div>

<div class="IconDiv">
  <span class="IconAddLink">
    <IconButton
      on:click={addLink}
      title={$_('ui.editTableLinks.addLink')}
      class="material-icons"
      style="font-size: 3.5vmin;"
      trailing>add_circle_outline</IconButton
    >
  </span>
</div>

<style>
  .IconAddLink,
  .sortButton {
    cursor: pointer;
  }
  .IconAddLink:hover {
    color: #011caa;
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
