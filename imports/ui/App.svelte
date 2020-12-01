<script>
  import { Router, Route } from 'svelte-routing';
  import { isLoading } from 'svelte-i18n';
  import Search from './pages/Search.svelte';
  import Profil from './pages/Profil.svelte';
  import Login from './components/Login.svelte';
  import Spinner from './components/Spinner.svelte';

  export let url = '';
  let userRedirect = false;
</script>

{#if $isLoading}
  <Spinner />
{:else}
  <Login bind:userRedirect />
  {#if userRedirect === false}
    <Router {url}>
      <div class="container">
        <div>
          <Route path="profil/:publicName" component={Profil} />
          <Route path="/">
            <Search />
          </Route>
        </div>
      </div>
    </Router>
  {/if}
{/if}
