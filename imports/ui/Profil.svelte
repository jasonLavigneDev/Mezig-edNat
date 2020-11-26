<script>
  import Link from './Link.svelte';
  import LinkRS from './LinkRS.svelte';
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';

  let MezigActu = JSON.parse(localStorage.getItem('ProfilActu'));
  $: user_id = useTracker(() => Meteor.userId());
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
    margin-bottom: 5vmin;
    margin-top: 1vmin;
    color: white;
  }
  .DivRS {
    display: flex;
    height: 10vh;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>{MezigActu.publicName} | EduCard</title>
</svelte:head>

<div class="ProfilPic">
  <img
    src="https://static-cdn.jtvnw.net/jtv_user_pictures/4850c623-9385-48d1-857c-fcc28e030040-profile_image-300x300.png"
    alt="Photo de profil de l'utilisateur" />
</div>
<h1>{MezigActu.publicName}</h1>
<ul>
  {#each MezigActu.links as link}
    {#if link.isSocialNetwork === false}
      {#if $user_id !== null || link.isPublic === true}
        <Link {link} />
      {/if}
    {/if}
  {/each}
</ul>
<div class="DivRS">
  {#each MezigActu.links as link}
    {#if link.isSocialNetwork === true}
      {#if $user_id !== null || link.isPublic === true}
        <LinkRS {link} />
      {/if}
    {/if}
  {/each}
</div>
