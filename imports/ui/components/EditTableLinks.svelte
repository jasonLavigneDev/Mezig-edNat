<script>
  import { _ } from 'svelte-i18n';
  import List, { Separator } from '@smui/list/bare';
  import '@smui/list/bare.css';
  import EditLink from '../components/EditLink.svelte';
  import { Icon } from '@smui/chips/bare';
  import '@smui/chips/bare.css';

  export let links;

  const addLink = () => {
    links.push({ label: '', URL: '', isSocialNetwork: false, isPublic: true });
    links = links;
  };

  const deleteLink = (event) => {
    links.splice(event.detail.index, 1);
    links = links;
  };
</script>

<List twoLine>
  {#each links as mezigLink, linkIndex}
    <EditLink {mezigLink} {linkIndex} on:deleteLink={deleteLink} on:updateLink />
    {#if linkIndex !== links.length - 1}
      <Separator />
    {/if}
  {/each}
</List>

<div class="IconDiv">
  <span class="IconAddLink">
    <Icon
      on:click={addLink}
      title={$_('ui.editTableLinks.addLink')}
      class="material-icons"
      style="font-size: 3.5vmin;"
      trailing
    >add_circle_outline</Icon
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
