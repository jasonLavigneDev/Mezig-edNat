<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Mezigs from '../api/mezig/mezig';
  import { Accounts } from 'meteor/accounts-base';
  import { onDestroy } from 'svelte';
  import SearchResult from './SearchResult.svelte';

  let Searching = '';
  let users = [];
  let userRedirect = false;

  $: user_id = useTracker(() => Meteor.userId());

  const ActuSearch = () => {
    if (Searching != '') {
      users = Mezigs.find({ publicName: { $regex: '' + Searching } }).fetch();
      console.log(users);
      document.querySelector('form').style.top = '15%';
    } else {
      users = [];
    }
  };

  const keycloakLogin = () => {
    Meteor.loginWithKeycloak();
  };

  // detect account creation failure (i.e: if logging in from keycloak)
  const stopCallback = Accounts.onLoginFailure((details) => {
    if (details.error.error === 'api.users.createUser') userRedirect = true;
  });
  onDestroy(() => {
    stopCallback();
  });
</script>

<style>
  form {
    position: absolute;
    right: 0;
  }

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

  form {
    transition-duration: 0.7s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    background: var(--color-brand);
    border-radius: var(--rad);
  }
  input,
  button {
    height: var(--height);
    font-family: var(--font-fam);
    border: 0;
    color: var(--color-dark);
    font-size: 1rem;
  }
  input[type='search'] {
    outline: 0;
    width: 100%;
    background: var(--color-light);
    padding: 0 1.6rem;
    border-radius: var(--rad);
    appearance: none;
    transition: all var(--dur) var(--bez);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
  }
  button {
    font-weight: bold;
    background: var(--color-brand);
  }
  #buttonSubmit {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--btn-width);
    border-radius: 0 var(--rad) var(--rad) 0;
  }
  .loginMsg {
    font-weight: bold;
    color: var(--color-brand);
  }
  .loginMenu {
    float: right;
  }
  input:not(:placeholder-shown) {
    border-radius: var(--rad) 0 0 var(--rad);
    width: calc(100% - var(--btn-width));
  }
  label {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
  .SearchResultDiv{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 25%;
    width: 40%;
  }
</style>

<svelte:head>
  <title>Acceuil | Mezig</title>
</svelte:head>

{#if userRedirect === true}
  <p class="loginMsg">
    Votre utilisateur n'a pas de compte LaBoite, veuillez cliquer sur le bouton ci-dessous pour le créer, puis cliquez
    sur
    <a href="#" on:click={keycloakLogin}>ce lien</a>
  </p>
  <button id="redirectButton" on:click={() => window.open('http://localhost:3000/signin', '_blank')}>connexion à LaBoite</button>
{:else}
  {#await Meteor.subscribe('mezigs.whitelist')}
    <p class="loginMsg">Chargement des utilisateurs…</p>
  {:then}
    <div class="loginMenu">
      {#if $user_id === null}
        <button id="buttonConnect" on:click={keycloakLogin}>Se connecter</button>
      {:else}
        <h1 class="loginMsg">Bienvenue {Meteor.user().username}</h1>
        <button id="buttonLogout" on:click={() => Meteor.logout()}>Déconnexion</button>
      {/if}
    </div>
    <form on:submit|preventDefault on:change={ActuSearch} role="search">
      <label for="search">Search for stuff</label>
      <input id="search" autocomplete="off" type="search" placeholder="Rechercher..." bind:value={Searching} required />
      <button id="buttonSubmit" type="submit">Go</button>
    </form>
    
  <div class="SearchResultDiv">
    {#each users as user}
    <SearchResult {user} />
    {/each}
  </div>
      
  {/await}
{/if}
