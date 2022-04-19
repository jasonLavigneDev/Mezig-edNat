<script>
  import { _ } from 'svelte-i18n';
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import '../../api/appsettings/appsettings'
  import Spinner from '../components/Spinner.svelte';
  import AppSettings from '../../api/appsettings/appsettings';

  export let location = null;
  
$: settings = useTracker(() => {
    const sub = Meteor.subscribe('appsettings.all');
    if (sub.ready()) {
      return AppSettings.findOne({ _id: 'settings'}) 
    }
    return {maintenance: true, textMaintenance: ''}
 
  });
</script>

<svelte:head>
  <title>Maintenance</title>
</svelte:head>

{#await Meteor.subscribe('appsettings.all')}
  <Spinner />
{:then}
  <div class="container">
    <h1 class="content">
        {$_('api.mezigs.maintenance')}
    </h1>
    <p class="subtitle">
      {$settings.textMaintenance}
    </p>
  </div>
{/await}

<style>
  .container {
    display: flex;
    flex-direction: column;
    border: rgba(255, 0, 0, 0.7) solid 5px;
    background-color: white;
    margin-top: 10vh;
    border-radius: 15px;
  }
  .content {
    display: flex;
    padding-top: 35px;
    justify-content: center;
  }
  .subtitle {
    display: flex;
    justify-content: center;
  }
</style>
