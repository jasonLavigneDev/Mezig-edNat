<script>
  import { Router, Route } from 'svelte-routing';
  import { isLoading } from 'svelte-i18n';
  import Search from './pages/Search.svelte';
  import Profil from './pages/Profil.svelte';
  import Nav from './components/Nav.svelte';
  import Spinner from './components/Spinner.svelte';
  import EditProfil from './pages/EditProfil.svelte';
  import Signin from './pages/Signin.svelte';

  export let url = '';
  let userRedirect = false;
  let profileOk = true;
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />

{#if $isLoading}
  <Spinner />
{:else}
  {#if userRedirect === false}
    <Router {url}>
      <div class="container">
        {#if profileOk === false}
          <div>
            <Route>
              <EditProfil bind:profileOk />
            </Route>
          </div>
        {:else}
          <div>
            <Route path="profil/:publicName" component={Profil} />
            <Route path="signin" component={Signin} />
            <Route path="/edit" component={EditProfil} />
            <Route component={Search} />
          </div>
        {/if}
      </div>
    </Router>
  {/if}
  <Nav bind:userRedirect bind:profileOk />
{/if}
