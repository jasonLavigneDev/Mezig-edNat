<script>
  import Snackbar, { Label } from '@smui/snackbar';
  import '@smui/snackbar/bare.css';
  import IconButton from '@smui/icon-button';
  import '@smui/icon-button/bare.css';

  import { _ } from 'svelte-i18n';

  export let publicName;
  let mySnackbar;

  function handleCopy() {
    navigator.clipboard.writeText(`${Meteor.absoluteUrl()}profil/${publicName}`).then(mySnackbar.open());
  }
</script>

<div class="shareLink">
  <IconButton title={$_('ui.share')} on:click={handleCopy} class="material-icons" trailing>link</IconButton>
</div>

<Snackbar bind:this={mySnackbar}>
  <Label>{$_('ui.copiedLink')}</Label>
</Snackbar>

<style>
  .shareLink {
    cursor: pointer;
    color: #040D3E;
  }
</style>
