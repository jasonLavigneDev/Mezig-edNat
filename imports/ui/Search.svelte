<script>
  import { Meteor } from 'meteor/meteor';
  import Mezigs from '../api/mezig/mezig';
  import SearchResult from './SearchResult.svelte';

  let Searching = '';
  let users = [];

  const ActuSearch = () => {
    if (Searching != '') {
      users = Mezigs.find({ publicName: { $regex: '' + Searching } }).fetch();
      console.log(users);
      document.querySelector('form').style.top = '15%';
    } else {
      users = [];
    }
  };
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
  .msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    font-weight: bold;
    color: var(--color-brand);
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
  .SearchResultDiv {
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

{#await Meteor.subscribe('mezigs.whitelist')}
  <div class="msg">Chargement des utilisateurs…</div>
{:then}
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
