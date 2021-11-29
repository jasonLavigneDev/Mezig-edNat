<script>
  import { _ } from 'svelte-i18n';
  import '@smui/dialog/bare.css';
  import '@smui/textfield/bare.css';
  import '@smui/button/bare.css';
  import '@smui/chips/bare.css';
  import DataTable from '../components/DataTable.svelte';
  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'

  export let location = null;
</script>

<svelte:head>
  <title>{$_('ui.Admin.title')} | {$_('ui.appName')}</title>
</svelte:head>

<div class="DataTable">
  <DataTable />
</div>

<style>
.DataTable {
    display: flex;
    justify-content: center;
  }
</style>
