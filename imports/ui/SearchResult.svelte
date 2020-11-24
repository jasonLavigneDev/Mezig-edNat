<script>
import { fly } from 'svelte/transition';

  export let user;

  import { ProfilName } from '../stores/stores.js';

  const ChangePage = () => {
    ProfilName.set(user.publicName);
    localStorage.setItem('ProfilActu', JSON.stringify(user));
    window.location = '/profil';
  };
</script>

<style>
  p {
    cursor: pointer;
  }
  .Result{
    background-color: antiquewhite;
    border-radius: 20px;
    display: flex;
    margin-bottom: 15px;
    cursor : pointer;
  }
  h3{
    font-size: 2.5vmin;
    margin-left: 5%;
    margin-bottom: 5%;
  }
  .Result>img{
    height: 8vmin;
    width: 8vmin;
    clip-path: circle(50%);
    margin: 2%;
    margin-left: 3%;
  }
  .skillsResult{
    display: flex;
    line-height: normal;
  }
</style>



<div  on:click={ChangePage} transition:fly="{{ y: 100, duration: 500, delay: 200 }}" class="Result">
  <img
    src="https://static-cdn.jtvnw.net/jtv_user_pictures/4850c623-9385-48d1-857c-fcc28e030040-profile_image-300x300.png"
    alt="Photo de profil de l'utilisateur" />
  <div class="texteResult">
    <h3>{user.publicName}</h3>
    <div class="skillsResult">
      {#each user.skills as skill}
        <p>#{skill} </p>
      {/each}
    </div>
  </div>
</div>

