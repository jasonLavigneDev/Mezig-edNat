<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';
  import SearchResult from '../components/SearchResult.svelte';
  import Spinner from '../components/Spinner.svelte';
  import { searchingStore } from '../../stores/stores';

  let users = [];
  let query = '';
  let searching = '';
  let previousSearch = '';
  const regexSkills = /#/;
  let noResult = '';

  onMount(async () => {
    searching = previousSearch;
    Meteor.subscribe('mezigs.whitelist');
  });

  $: mezigCount = useTracker(() => Mezigs.find({}).count());
  $: previousSearch = $searchingStore;
  $: users = ActuSearch(searching);

  function handleClickSkill(event) {
    searching += ` #${event.detail.text}`; // Add skill to existing search string
  }

  const ActuSearch = (searchingString) => {
    searchingStore.set(searchingString);
    if (searchingString.length >= 3) {
      query = { $and: [] };
      for (let i = 0; i < searchingString.split(' ').length; i++) {
        if (regexSkills.test(searchingString.split(' ')[i])) {
          query.$and.push({ skills: { $regex: searchingString.split(' ')[i].split('#')[1], $options: 'i' } });
        } else {
          query.$and.push({ publicName: { $regex: '' + searchingString.split(' ')[i], $options: 'i' } });
        }
      }
      users = Mezigs.find(query).fetch();

      if (users.length == 0) {
        noResult = $_('ui.noSearchResult') + searchingString + '...';
      } else {
        noResult = '';
      }
    } else {
      noResult = '';
      users = [];
    }
    return users;
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
    max-width: 90vw;
    background: var(--color-brand);
    border-radius: var(--rad);
  }
  input {
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
    width: 90%;
  }
  .noResult {
    color: white;
    text-align: center;
    font-size: 2vmin;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
  }

  @media (min-width: 576px) {
    .SearchResultDiv {
      width: 90%;
    }
  }

  @media (min-width: 768px) {
    .SearchResultDiv {
      width: 70%;
    }
  }

  @media (min-width: 992px) {
    .SearchResultDiv {
      width: 60%;
    }
  }

  @media (min-width: 1200px) {
    * {
      width: 40%;
    }
  }
</style>

<svelte:head>
  <title>Acceuil | {$_('ui.appName')}</title>
</svelte:head>

{#if mezigCount <= 1}
  <Spinner />
{:else}
  <form on:submit|preventDefault role="search" style={users.length > 0 ? 'top: 15%;' : ''}>
    <label for="search">{$_('ui.searchLabel')}</label>
    <input
      id="search"
      autocomplete="off"
      autofocus
      type="search"
      placeholder={$_('ui.searchPlaceHolder')}
      bind:value={searching}
      required />
  </form>

  <div class="SearchResultDiv">
    {#each users as user}
      <SearchResult {user} on:clickSkills={handleClickSkill} />
    {/each}
  </div>

  <p class="noResult">{noResult}</p>
{/if}
