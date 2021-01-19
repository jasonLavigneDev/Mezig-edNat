<script>
  import { fly, fade } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const blankUser = '/blank_user.svg';
  export let user;

  const handleGoProfile = () => {
    navigate(`/profil/${user.publicName}`, { state: `/profil/${user.publicName}` });
  };

  const clickSkills = (skill) => {
    dispatch('clickSkills', {
      text: skill,
    });
  };
</script>

<style>
  p {
    cursor: pointer;
  }
  .Result {
    background-color: antiquewhite;
    border-radius: 20px;
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
  }
  h3 {
    font-size: 2.5vmin;
    margin-left: 10px;
    margin-bottom: 8px;
    margin-top: 22px;
  }
  .Result > img {
    height: 8vmin;
    width: 8vmin;
    clip-path: circle(50%);
    margin: 2%;
    margin-left: 3%;
  }
  .skillsResult {
    display: flex;
    line-height: normal;
    line-break: auto;
    flex-wrap: wrap;
  }
  .skillsResult > p {
    margin: 0;
    margin-right: 5px;
  }
  .skillsResult > p:first-child {
    margin-left: 30px;
  }
  .skillsResult > p:hover {
    opacity: 0.6;
  }
  .textResult {
    max-width: 80%;
    line-break: auto;
  }
</style>

<div
  on:click={handleGoProfile}
  in:fly={{ y: 100, duration: 500, delay: 200 }}
  class="Result">
  <img src={user.profilPic || blankUser} alt="Avatar de l'utilisateur" />
  <div class="textResult">
    <h3>{user.publicName}</h3>
    <div class="skillsResult">
      {#each user.skills as skill}
        <p on:click|stopPropagation={clickSkills(skill)}>#{skill}</p>
      {/each}
    </div>
  </div>
</div>
