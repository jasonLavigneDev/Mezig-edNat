<script>
  import { Meteor } from 'meteor/meteor';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Select, { Option } from '@smui/select';

  import SearchResult from '../components/SearchResult.svelte';
  import Skills from '../../api/skills/skills';
  import { searchingStore } from '../../stores/stores';
  import PackageJSON from '../../../package.json';
  import TagGroup from '../components/TagGroup.svelte';
  import Structures from '../../api/structures/structures';
  import Mezigs from '../../api/mezigs/mezigs';

  let version = PackageJSON.version;

  export let location = null;

  let searching = '';
  let previousSearch = '';
  let noResult = '';
  let page = 1;
  let selectStructure = undefined;
  let itemPerPage = 20;
  let usersScroll = [];
  let newLoadedMezigs = [];
  let totalFoundMezigs = 0;
  let timeout;
  let ulMezigs = {};
  let allMezigsCount;

  $: selectStructure !== undefined && ActuSearch();

  $: Meteor.call('mezigs.publicProfileCount', {}, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      allMezigsCount = res;
    }
  });

  $: skillsTab = useTracker(() => {
    const sub = Meteor.subscribe('skills.table.all');
    if (sub.ready()) {
      return Skills.findFromPublication('skills.table.all', {}).fetch();
    }
    return [];
  });

  $: structures = useTracker(() => {
    const sub = Meteor.subscribe('structures.all');
    const mezig = Meteor.subscribe('mezigs.allPublish');
    if (sub.ready() && mezig.ready()) {
      const allStructures = Mezigs.find(
        { $and: [{ structure: { $ne: '' } }, { structure: { $ne: undefined } }] },
        { fields: { structure: 1 } },
      )
        .fetch()
        .map((struc) => struc.structure);

      const uniqueStructures = allStructures.filter((struc, i) => allStructures.indexOf(struc) === i);
      return Structures.find({ _id: { $in: uniqueStructures } }).fetch();
    }
  });

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
      res = Meteor.call('mezigs.getMezigs', { selectStructure, search: searching, itemPerPage }, (err, res) => {
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
    res = Meteor.call('mezigs.getMezigs', { selectStructure, search: searching, page, itemPerPage }, (err, res) => {
      newLoadedMezigs = res.data;
      totalFoundMezigs = res.total;
    });
  }
</script>

<svelte:head>
  <title>Accueil | {$_('ui.appName')} {version}</title>
</svelte:head>

<h1 class="numberUsers">{allMezigsCount} {$_('api.users.number')}</h1>
<form on:submit|preventDefault role="search" style={usersScroll.length > 0 ? 'top: 15%;' : ''}>
  <label for="search">{$_('ui.searchLabel')}</label>
  <div style="display: flex; flex-direction: column; width: 100%">
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
  </div>
  <Select bind:value={selectStructure} label={$_('ui.searchFilter')} style="width:20%">
    <Option value={undefined} />
    {#if $structures}
      {#each $structures as struc}
        <Option value={struc._id}>{struc.name}</Option>
      {/each}
    {/if}
  </Select>
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

<div style="margin-top:75vh; width: 140%;margin-left: -20%; text-align:center">
  <TagGroup {skillsTab} on:clickSkills={handleClickSkill} />
</div>

<style>
  form {
    display: flex;
    transition-duration: 0.7s;
    position: absolute;
    top: 40%;
    left: 55%;
    right: 0;
    transform: translate(-50%, -50%);
    width: 75vw;
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
    width: 98%;
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
    max-height: 540px;
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
