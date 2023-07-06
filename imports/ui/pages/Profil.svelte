<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { _ } from 'svelte-i18n';
  import Chip, { Text } from '@smui/chips';
  import Mezigs from '../../api/mezigs/mezigs';
  import Structures from '../../api/structures/structures';
  import Links from '../components/Links.svelte';
  import Spinner from '../components/Spinner.svelte';
  import Share from '../components/Share.svelte';
  import PackageJSON from '../../../package.json';
  import Tooltip from '../components/Tooltip.svelte';
  import IconButton from '@smui/icon-button';

  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';

  let version = PackageJSON.version;
  let noNclocatorDialog = '';

  export let location = null;
  export let publicName = '';
  const blankUser = '/blank_user.svg';

  $: currentUser = useTracker(() => Meteor.user());
  $: currentMezig = useTracker(() => Mezigs.findOne({ publicName }));
  $: currentStructure = useTracker(() => $currentMezig ? Structures.findOne({_id: $currentMezig.structure}) : undefined);
  
  // Create and copy the ferederation ID for Nextcloud
  const handleCopy = () => {
    Meteor.call('mezigs.getFedId',{publicName} , function(error, result) {
      if(!error && result != '') {
        navigator.clipboard.writeText(result);
      } else {
        noNclocatorDialog.setOpen(true);
      } 
    });
  }

</script>

<svelte:head>
  <title>{publicName} | {$_('ui.appName')} {version}</title>
</svelte:head>

{#await Meteor.subscribe('mezigs.profile', { publicName })}
  <Spinner />
{:then}
  {#if $currentMezig}
    {console.log($currentMezig)}
    {#await Meteor.subscribe('structures.one', { _id: $currentMezig.structure })}
      <Spinner />
    {:then}
    <div class="Profil">
      {#if $currentUser && $currentUser.isActive === false}
        <h3 class="BlacklistInfo">{$_('ui.activationNeeded')}</h3>
      {/if}
      {#if $currentMezig.blacklist === true}
        <h3 class="BlacklistInfo">{$_('ui.profileBlacklisted')}</h3>
      {/if}
      <div class="ProfilPic">
        <img src={$currentMezig.profilPic || blankUser} alt={$_('ui.avatarTitle')} />
        <div class="shareButton" role="button">
          <Share {publicName} />
        </div>
        {#if $currentUser && $currentUser.isActive}
          <div class="nextcloudButton" role="button">
            <Tooltip text={$_('ui.nclocator.shareNClocator')} bottom>
              <IconButton class="material-icons" on:click={handleCopy}>filter_drama</IconButton>
            </Tooltip>
          </div>
        {/if}
      </div>
      <h1>{publicName}</h1>
      {#if $currentMezig.email}
        <h2><a href={`mailto:${$currentMezig.email}`}>{$currentMezig.email}</a></h2>
      {/if}
      {#if $currentStructure}
        <Chip chip={$currentStructure.name} style={'background-color: #6200ee; color: white; display:flex; justify-content:center;'}>
          <Text>{$currentStructure.name}</Text>
        </Chip>
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
    {/await}
  {:else}
    <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
  {/if}

  <Dialog bind:this={noNclocatorDialog} aria-labelledby="noNclocator-title" aria-describedby="noNclocator-content">
    <Title id="noNclocator-title">{$_('ui.nclocator.missing')}</Title>
      <Content id="noNclocator-content">
        {$_('ui.nclocator.contentDialog')}
      </Content>
    <Actions>
      <Button>
        <Label>{$_('ui.ok')}</Label>
      </Button>
    </Actions>
  </Dialog>
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
    color: var(--color-brand);
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
    color: var(--color-fadeblack);
    text-decoration: none;
  }
  .Biography {
    color: var(--color-fadeblack);
    text-align: center;
    font-size: 2.5vmin;
    margin-bottom: 2vmin;
  }
  .Skills {
    display: flex;
    height: 5%;
    justify-content: center;
    font-size: 2.5vmin;
    color: var(--color-fadeblack);
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
    color: var(--color-fadeblack);
  }
  .BlacklistInfo {
    color: var(--color-brand);
    text-align: center;
  }
  .shareButton {
    position: absolute;
    top: 12%;
    left: 68%;
    width: min-content;
  }
  .nextcloudButton {
    position: absolute;
    top: 30%;
    left: 68%;
    width: min-content;
  }
</style>
