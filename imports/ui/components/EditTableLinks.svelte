<script>
  import { _ } from 'svelte-i18n';
  import Button, { Label } from '@smui/button/bare';
  import '@smui/button/bare.css';
  import List, { Separator } from '@smui/list/bare';
  import '@smui/list/bare.css';
  import EditLink from '../components/EditLink.svelte';

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
    <EditLink {mezigLink} {linkIndex} on:deleteLink={deleteLink} />
    {#if linkIndex !== links.length - 1}
      <Separator />
    {/if}
  {/each}
</List>
<Button variant="raised" on:click={addLink}>
  <Label>{$_('ui.editTableLinks.addLink')}</Label>
</Button>
