<script>
  import { _ } from 'svelte-i18n';
  import '@smui/dialog/bare.css';
  import '@smui/textfield/bare.css';
  import '@smui/button/bare.css';
  import '@smui/chips/bare.css';
  import DataTable from '../components/DataTable.svelte';
  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'
</script>

<svelte:head>
  <title>{$_('ui.Admin.title')} | {$_('ui.appName')}</title>
</svelte:head>

<div class="DataTable">
  <DataTable />
</div>

<style>
  :root {
    --rad: 0.7rem;
    --dur: 0.3s;
    --color-dark: #2f2f2f;
    --color-light: #fff;
    --color-brand: #57bd84;
    --font-fam: 'Lato', sans-serif;
    --height: 3rem;
    --btn-width: 4rem;
    --bez: cubic-bezier(0, 0, 0.43, 1.49);
  }
  .DataTable {
    display: flex;
    justify-content: center;
  }
</style>
