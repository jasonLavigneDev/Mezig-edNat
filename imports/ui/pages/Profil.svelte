<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';
  import Links from '../components/Links.svelte';
  import Spinner from '../components/Spinner.svelte';
  import Share from '../components/Share.svelte';
  import PackageJSON from '../../../package.json';
  let version = PackageJSON.version;

  export let location = null;
  export let publicName = '';
  const blankUser = '/blank_user.svg';

  $: currentUser = useTracker(() => Meteor.user());
  $: currentMezig = useTracker(() => Mezigs.findOne({ publicName }));
</script>

<svelte:head>
  <title>{publicName} | {$_('ui.appName')} {version}</title>
</svelte:head>

{#await Meteor.subscribe('mezigs.profile', { publicName })}
  <Spinner />
{:then}
  {#if $currentMezig}
    <div class="Profil">
      {#if $currentUser && $currentUser.isActive === false}
        <h3 class="BlacklistInfo">{$_('ui.activationNeeded')}</h3>
      {/if}
      {#if $currentMezig.blacklist === true}
        <h3 class="BlacklistInfo">{$_('ui.profileBlacklisted')}</h3>
      {/if}
      <div class="ProfilPic">
        <img src={$currentMezig.profilPic || blankUser} alt={$_('ui.avatarTitle')} />
        <div class="shareButton" role="button"><Share {publicName} /></div>
      </div>
      <h1>{publicName}</h1>
      {#if $currentMezig.email}
        <h2><a href={`mailto:${$currentMezig.email}`}>{$currentMezig.email}</a></h2>
      {/if}
      <p class="Biography">{$currentMezig.biography || ''}</p>
      <div class="Skills">
        <details>
          <summary role="list">{$_('ui.profileSkills')}</summary>
          {#if $currentMezig.skills.length > 0}
            {#each $currentMezig.skills as skill}
              <p class="TextSkill">#{skill}</p>
            {/each}
          {:else}
            <p>{$_('ui.profileSkillsNone')}</p>
          {/if}
        </details>
      </div>
      {#if $currentMezig.links}
        <Links {currentMezig} />
      {/if}
    </div>
  {:else}
    <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
  {/if}
{/await}

<style>
  .Profil {
    padding-top: 10vh;
  }
  .ProfilPic {
    display: block;
    padding-top: 5%;
    position: relative;
  }
  .ProfilPic > img {
    display: block;
    width: 20vmin;
    margin-right: auto;
    margin-left: auto;
    clip-path: circle(50% at 50% 50%);
  }
  h1 {
    text-align: center;
    display: block;
    margin: 0;
    margin-bottom: 2vmin;
    font-size: 4.5vmin;
    margin-top: 1vmin;
    font-family: 'WorkSansRegular', sans-serif;
    color: #011caa;
  }
  h2 {
    text-align: center;
    display: block;
    margin: 0;
    margin-bottom: 2vmin;
    font-size: 2.5vmin;
    margin-top: 1vmin;
  }
  h2 > a {
    color: #040d3e;
    text-decoration: none;
  }
  .Biography {
    color: #040d3e;
    text-align: center;
    font-size: 2.5vmin;
    margin-bottom: 2vmin;
  }
  .Skills {
    display: flex;
    height: 5%;
    justify-content: center;
    font-size: 2.5vmin;
    color: #040d3e;
    margin-bottom: 4vmin;
  }
  .TextSkill {
    display: inline-flex;
    align-items: center;
    margin: 1vmin;
  }
  summary {
    cursor: pointer;
    text-align: center;
    -moz-user-select: none;
    user-select: none;
    outline: none;
  }
  .EmptyMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #040d3e;
  }
  .BlacklistInfo {
    color: #011caa;
    text-align: center;
  }
  .shareButton {
    position: absolute;
    top: 12%;
    left: 68%;
    width: min-content;
  }
</style>
