<script>
  import Snackbar, { Label } from '@smui/snackbar/bare';
  import '@smui/snackbar/bare.css';
  import { Icon } from '@smui/icon-button/bare';
  import '@smui/icon-button/bare.css';

  import { _ } from 'svelte-i18n';

  export let publicName;
  let mySnackbar;

  function handleCopy() {
    navigator.clipboard.writeText(`${Meteor.absoluteUrl()}profil/${publicName}`).then(mySnackbar.open());
  }
</script>

<div class="shareLink">
  <Icon title={$_('ui.share')} on:click={handleCopy} class="material-icons" trailing>link</Icon>
</div>

<Snackbar bind:this={mySnackbar}>
  <Label>{$_('ui.copiedLink')}</Label>
</Snackbar>

<style>
  .shareLink {
    cursor: pointer;
    color: whitesmoke;
  }
</style>
