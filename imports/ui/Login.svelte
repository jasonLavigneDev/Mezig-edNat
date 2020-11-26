<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Accounts } from 'meteor/accounts-base';
  import { onDestroy } from 'svelte';

  export let userRedirect = false;

  $: userId = useTracker(() => Meteor.userId());
  $: user = useTracker(() => Meteor.user());

  const keycloakLogin = () => {
    Meteor.loginWithKeycloak();
  };

  // detect account creation failure (i.e: if logging in from keycloak)
  const stopCallback = Accounts.onLoginFailure((details) => {
    if (details.error.error === 'api.users.createUser') userRedirect = true;
  });

  onDestroy(() => {
    console.log('STOP CALLBACK !!');
    stopCallback();
  });
</script>

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
  button {
    height: var(--height);
    font-family: var(--font-fam);
    border: 0;
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: bold;
    background: var(--color-brand);
  }
  .loginMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: var(--color-brand);
  }
  #loginUser {
    font-weight: bold;
    color: var(--color-brand);
  }
  .loginMenu {
    float: right;
  }
</style>

{#if userRedirect === true}
  <div class="loginMsg">
    <p>
      Votre utilisateur n'a pas de compte LaBoite, veuillez cliquer sur le bouton ci-dessous pour le créer, puis cliquez
      sur
      <a href="#" on:click={keycloakLogin}>ce lien</a>
    </p>
    <button id="redirectButton" on:click={() => window.open('http://localhost:3000/signin', '_blank')}>connexion à
      LaBoite</button>
  </div>
{:else}
  <div class="loginMenu">
    {#if $userId === null}
      <button id="buttonConnect" on:click={keycloakLogin}>Se connecter</button>
    {:else}
      <h1 id="loginUser">{($user || { firstName: '' }).firstName}</h1>
      <button id="buttonLogout" on:click={() => Meteor.logout()}>Déconnexion</button>
    {/if}
  </div>
{/if}
