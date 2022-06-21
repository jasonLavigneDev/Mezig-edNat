<script>
  import { Router, Route } from 'svelte-routing';
  import { isLoading } from 'svelte-i18n';
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Search from './pages/Search.svelte';
  import Profil from './pages/Profil.svelte';
  import Nav from './components/Nav.svelte';
  import Spinner from './components/Spinner.svelte';
  import EditProfil from './pages/EditProfil.svelte';
  import Signin from './pages/Signin.svelte';
  import Signup from './pages/Signup.svelte';
  import Admin from './pages/Admin.svelte';
  import Maintenance from './pages/Maintenance.svelte';
  import AppSettings from './../api/appsettings/appsettings';

  export let url = '';
  let userRedirect = false;
  let profileOk = true;
  let userActive = false;
  const { laboiteUrl, enableKeycloak } = Meteor.settings.public;
  $: settings = useTracker(() => {
    const sub = Meteor.subscribe('appsettings.all');
    if (sub.ready()) {
      return AppSettings.findOne({ _id: 'settings' });
    }
    return { maintenance: true, textMaintenance: '' };
  });
</script>

{#if $isLoading}
  <Spinner />
{:else if userRedirect === false}
  <Nav bind:userRedirect bind:profileOk bind:userActive />
  <Router {url}>
    <div class="container">
      {#if $settings.maintenance}
        <Maintenance />
      {:else if profileOk === false && userActive === true}
        <div>
          <Route>
            <EditProfil bind:profileOk />
          </Route>
        </div>
      {:else}
        <div>
          <Route path="/profil/:publicName" component={Profil} />
          {#if !enableKeycloak}
            <Route path="/signin" component={Signin} />
          {/if}
          {#if !laboiteUrl && !enableKeycloak}
            <Route path="/signup" component={Signup} />
          {/if}
          {#if userActive === true}
            <Route path="/edit" component={EditProfil} />
            {#if !laboiteUrl}
              <Route path="/admin" component={Admin} />
            {/if}
          {/if}
          <Route component={Search} />
        </div>
      {/if}
    </div>
  </Router>
{/if}
