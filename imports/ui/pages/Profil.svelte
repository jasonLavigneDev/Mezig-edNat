<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';
  import Link from '../components/Link.svelte';
  import LinkRS from '../components/LinkRS.svelte';
  import Spinner from '../components/Spinner.svelte';

  export let publicName = '';

  $: user_id = useTracker(() => Meteor.userId());
  $: currentMezig = useTracker(() => Mezigs.findOne({ publicName }));
</script>

<style>
  .ProfilPic {
    display: block;
    padding-top: 5%;
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
    font-size: 3vmin;
    margin-top: 1vmin;
    color: white;
  }
  .DivRS {
    display: flex;
    height: 10vh;
    justify-content: center;
  }
  .Biography {
    color: white;
    text-align: center;
    font-size: 2vmin;
    margin-bottom: 5vmin;
  }
  .EmptyMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: white;
  }
</style>

<svelte:head>
  <title>{publicName} | {$_('ui.appName')}</title>
</svelte:head>

{#await Meteor.subscribe('mezigs.profile', { publicName })}
  <Spinner />
{:then}
  <a href="/" use:routerLink>{$_('ui.backToHome')}</a>
  <div class="ProfilPic">
    <img
      src={$currentMezig.profilPic || 'https://static-cdn.jtvnw.net/jtv_user_pictures/4850c623-9385-48d1-857c-fcc28e030040-profile_image-300x300.png'}
      alt={$_('ui.avatarTitle')} />
  </div>
  <h1>{publicName}</h1>
  {#if $currentMezig}
    <p class="Biography">{$currentMezig.biography || ''}</p>
    {#if $currentMezig.links}
      <ul>
        {#each $currentMezig.links as link}
          {#if link.isSocialNetwork === false}
            {#if $user_id !== null || link.isPublic === true}
              <Link {link} />
            {/if}
          {/if}
        {/each}
      </ul>
      <div class="DivRS">
        {#each $currentMezig.links as link}
          {#if link.isSocialNetwork === true}
            {#if $user_id !== null || link.isPublic === true}
              <LinkRS {link} />
            {/if}
          {/if}
        {/each}
      </div>
    {/if}
  {:else}
    <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
  {/if}
{/await}
