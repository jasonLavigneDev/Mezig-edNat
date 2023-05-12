<script>
  import { Meteor } from 'meteor/meteor';
  import { fly } from 'svelte/transition';
  import { navigate } from 'svelte-routing';
  import Chip, { Text } from '@smui/chips';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Tag from '../components/Tag.svelte';
  import Spinner from '../components/Spinner.svelte';
  import Structures from '../../api/structures/structures';

  const blankUser = '/blank_user.svg';
  export let user;
  console.log(user);

  $: currentStructure = useTracker(() => Structures.findOne({_id: user.structure}));

  const handleGoProfile = () => {
    navigate(`/profil/${user.publicName}`, { state: `/profil/${user.publicName}` });
  };
</script>

{#await Meteor.subscribe('structures.one', { _id: user.structure })}
<Spinner />
{:then}
  <div on:click={handleGoProfile} in:fly={{ y: 100, duration: 500, delay: 200 }} class="Result">
    <img src={user.profilPic || blankUser} alt="Avatar de l'utilisateur" />
    <div class="textResult">
      <h3>{user.publicName}</h3>
      {#if $currentStructure}
        <Chip chip={$currentStructure.name} style={'background-color: #6200ee; color: white; font-size: 12px'}>
          <Text>{$currentStructure.name}</Text>
        </Chip>
      {/if}
      <div class="skillsResult">
        {#each user.skills as skill}
          <Tag skill={`#${skill}`} on:clickSkills />
        {/each}
      </div>
    </div>
  </div>
{/await}


<style>
  .Result {
    background-color: rgba(90, 161, 216, 0.2);
    border-radius: 20px;
    display: flex;
    margin-bottom: 15px;
    margin-right: 10px;
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
  .textResult {
    max-width: 80%;
    line-break: auto;
  }
</style>
