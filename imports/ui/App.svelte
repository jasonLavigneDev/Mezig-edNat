<script>
  import { Router, Route } from 'svelte-routing';
  import Home from '../routes/Home.svelte';
  import Profil from '../routes/Profil.svelte';
  import Login from './Login.svelte';

  export let url = '';
  let userRedirect = false;
</script>

<Login bind:userRedirect />
{#if userRedirect === false}
  <Router {url}>
    <div class="container">
      <div>
        <Route path="profil/:publicName" component={Profil} />
        <Route path="/">
          <Home />
        </Route>
      </div>
    </div>
  </Router>
{/if}
