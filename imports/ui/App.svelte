<script>

  import { Router, Link, Route } from "svelte-routing";
  import Home from "../routes/Home.svelte";
  import Profil from "../routes/Profil.svelte";

  export let url = "";
</script>

<Router url="{url}">
<div class="container">
  <div>
    <Route path="profil" component="{Profil}" />
    <Route path="/"><Home /></Route>
  </div>

</div>

</Router>
