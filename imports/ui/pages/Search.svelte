<script>
  import { Meteor } from 'meteor/meteor';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';

  import SearchResult from '../components/SearchResult.svelte';
  import Mezigs from '../../api/mezigs/mezigs';
  import { searchingStore } from '../../stores/stores';
  import PackageJSON from '../../../package.json';
  import TagGroup from '../components/TagGroup.svelte';

  let version = PackageJSON.version;

  export let location = null;

  let searching = '';
  let previousSearch = '';
  let noResult = '';
  let page = 1;
  let itemPerPage = 20;
  let usersScroll = [];
  let newLoadedMezigs = [];
  let totalFoundMezigs = 0;
  let timeout;
  let ulMezigs = {};

  $: allMezigs = useTracker(() => {
    const sub = Meteor.subscribe('mezigs.table.all');
    if (sub.ready()) {
      return Mezigs.findFromPublication('mezigs.table.all', {}).fetch();
    }
    return [];
  });

  $: skillsTab = getSkillTab($allMezigs);

  function getSkillTab(mezigs) {
    let allSkills = {};
    let skills = [];
    mezigs.forEach(function (u) {
      u.skills.forEach(function (s) {
        if (s in allSkills) {
          allSkills[s] += 1;
        } else {
          allSkills[s] = 1;
        }
      });
    });
    Object.keys(allSkills).forEach((s) => {
      skills.push([s, allSkills[s]]);
    });

    skills.sort(function (a, b) {
      return b[1] - a[1];
    });
    return skills;
  }

  function getRandomSkills(sTab) {
    if (sTab) {
      let i = 0;
      let min = 10;
      let max = sTab.length;
      let temp;
      let res = [];
      if (max <= 10) {
        return res;
      } else {
        if (max < 20) {
          res = sTab.slice(10, max);
        } else {
          while (i < 10) {
            temp = sTab[Math.floor(Math.random() * (max - min) + min)];
            if (!res.includes(temp)) {
              res.push(temp);
              i++;
            }
          }
        }
        return res;
      }
    }
    return [];
  }

  onMount(async () => {
    searching = previousSearch;
    ActuSearch();
  });

  $: previousSearch = $searchingStore;
  $: usersScroll = [...usersScroll, ...newLoadedMezigs];

  function handleClickSkill() {
    searching = $searchingStore;
    ActuSearch();
  }

  const debounceFunc = (func, wait) => {
    return (...args) => {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  function ActuSearch() {
    searchingStore.set(searching);
    usersScroll = [];
    usersScroll = usersScroll;
    newLoadedMezigs = [];
    totalFoundMezigs = 0;
    page = 1;
    ulMezigs.scrollTop = 0;
    if (searching.length >= 3) {
      res = Meteor.call('mezigs.getMezigs', { search: searching, itemPerPage }, (err, res) => {
        if (!err) {
          newLoadedMezigs = res.data;
          totalFoundMezigs = res.total;
          if (totalFoundMezigs == 0) {
            noResult = $_('ui.noSearchResult') + searching + '...';
          } else {
            noResult = '';
          }
        } else {
          noResult = $_(err.reason);
        }
      });
    } else {
      noResult = '';
    }
  }

  function loadmore() {
    page++;
    res = Meteor.call('mezigs.getMezigs', { search: searching, page, itemPerPage }, (err, res) => {
      newLoadedMezigs = res.data;
      totalFoundMezigs = res.total;
    });
  }
</script>

<svelte:head>
  <title>Accueil | {$_('ui.appName')} {version}</title>
</svelte:head>

<h1 class="numberUsers">{$allMezigs.length} {$_('api.users.number')}</h1>
<form on:submit|preventDefault role="search" style={usersScroll.length > 0 ? 'top: 15%;' : ''}>
  <label for="search">{$_('ui.searchLabel')}</label>
  <input
    id="search"
    autocomplete="off"
    autofocus
    type="search"
    placeholder={$_('ui.searchTooltip')}
    bind:value={searching}
    on:input={debounceFunc(ActuSearch, 400)}
    required
  />
  {#if totalFoundMezigs !== 0}
    <p id="infos" class:end={usersScroll.length === totalFoundMezigs}>
      {usersScroll.length}
      {$_('ui.searchResult.displayed')}
      {totalFoundMezigs}
      {$_('ui.searchResult.total')}
    </p>
  {/if}
</form>
<ul id="results" class="SearchResultDiv" role="tablist" bind:this={ulMezigs}>
  {#each usersScroll as user}
    <SearchResult {user} on:clickSkills={handleClickSkill} />
  {/each}
  <SvelteInfiniteScroll
    threshold={itemPerPage}
    on:loadMore={() => loadmore()}
    hasMore={usersScroll.length < totalFoundMezigs}
  />
</ul>
<p class="noResult">{noResult}</p>

<div style="margin-top:79vh; width: 140%;margin-left: -20%; text-align:center">
  <TagGroup {skillsTab} on:clickSkills={handleClickSkill} />
</div>

<style>
  form {
    transition-duration: 0.7s;
    position: absolute;
    top: 50%;
    left: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    max-width: 90vw;
    background: var(--color-blue);
    border-radius: var(--rad);
  }
  input {
    height: var(--height);
    border: 0;
    color: var(--color-dark);
    font-size: 1rem;
  }
  input[type='search'] {
    outline: 0;
    width: 100%;
    background: #fff;
    padding: 0 1.6rem;
    border-radius: var(--rad);
    appearance: none;
    transition: all var(--dur) var(--bez);
    transition-property: width, border-radius;
    z-index: 1;
    position: relative;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
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
    width: 100%;
    max-height: 600px;
    overflow-y: scroll;
  }
  .noResult {
    color: var(--color-dark);
    text-align: center;
    font-size: 2vmin;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
  }
  .numberUsers {
    margin-top: 11%;
    width: 100%;
    text-align: center;
    color: #372f84;
  }
  #infos {
    margin-left: 1.6rem;
    opacity: 100%;
  }
  .end {
    font-weight: bold;
  }

  #results::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #2f2f2f;
    border-radius: 10px;
  }

  #results::-webkit-scrollbar {
    width: 9px;
  }
  #results {
    scrollbar-color: var(--color-blue) rgba(0, 0, 0, 0);
  }

  #results::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--color-blue);
  }
  #results::scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--color-blue);
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
