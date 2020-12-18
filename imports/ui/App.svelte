<script>
  import { Router, Route } from 'svelte-routing';
  import { isLoading } from 'svelte-i18n';
  import Search from './pages/Search.svelte';
  import Profil from './pages/Profil.svelte';
  import Nav from './components/Nav.svelte';
  import Spinner from './components/Spinner.svelte';
  import EditProfil from './pages/EditProfil.svelte';

  export let url = '';
  let userRedirect = false;
  let profileOk = true;
</script>

{#if $isLoading}
  <Spinner />
{:else}
  <Nav bind:userRedirect bind:profileOk/>
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
            <Route path="/edit" component={EditProfil} />
            <Route component={Search} />
          </div>
        {/if}
      </div>
    </Router>
  {/if}
{/if}
