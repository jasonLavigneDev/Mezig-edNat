<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Link from './Link.svelte';
  import LinkRS from './LinkRS.svelte';
  import Mezigs from '../api/mezigs/mezigs';

  export let publicName = '';
  $: user_id = useTracker(() => Meteor.userId());
  $: MezigActu = useTracker(() => Mezigs.findOne({ publicName }));
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
  <title>{MezigActu.publicName} | EduCard</title>
</svelte:head>

{#await Meteor.subscribe('mezigs.profile', { publicName })}
  <div class="msg">Chargement de l'utilisateur…</div>
{:then}
  <div class="ProfilPic">
    <img
      src="https://static-cdn.jtvnw.net/jtv_user_pictures/4850c623-9385-48d1-857c-fcc28e030040-profile_image-300x300.png"
      alt="Avatar de l'utilisateur" />
  </div>
  <h1>{publicName}</h1>
  {#if $MezigActu}
    <p class="Biography">{$MezigActu.biography || ''}</p>
    <ul>
      {#each $MezigActu.links as link}
        {#if link.isSocialNetwork === false}
          {#if $user_id !== null || link.isPublic === true}
            <Link {link} />
          {/if}
        {/if}
      {/each}
    </ul>
    <div class="DivRS">
      {#each $MezigActu.links as link}
        {#if link.isSocialNetwork === true}
          {#if $user_id !== null || link.isPublic === true}
            <LinkRS {link} />
          {/if}
        {/if}
      {/each}
    </div>
  {:else}
    <div class="EmptyMsg">Utilisateur inconnu</div>
  {/if}
{/await}
