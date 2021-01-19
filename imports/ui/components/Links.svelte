<script>

    import { Meteor } from 'meteor/meteor';
    import { useTracker } from 'meteor/rdb:svelte-meteor-data';

    import Link from '../components/Link.svelte';
    import LinkRS from '../components/LinkRS.svelte';

    export let currentMezig;
    let actualMezigs = $currentMezig;
    let SN = [];

    import tabSN from '../../api/mezigs/social-network.json';

  $: user_id = useTracker(() => Meteor.userId());

  

      actualMezigs.links.forEach(link => {
        SN[actualMezigs.links.indexOf(link)] = false;
        Object.keys(tabSN).forEach(NomSN => {
          let regexSN = new RegExp(tabSN[NomSN]["regex"]);
          if(regexSN.test(link.URL)){
                SN[actualMezigs.links.indexOf(link)] = true;
            }
    });
  
});


</script>


<style>
      .DivRS {
    display: flex;
    height: 10vh;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>


<ul>
    {#each $currentMezig.links as link}
      {#if SN[$currentMezig.links.indexOf(link)] === false}
        {#if $user_id !== null || link.isPublic === true}
          <Link {link} />
        {/if}
      {/if}
    {/each}
  </ul>
  <div class="DivRS">
    {#each $currentMezig.links as link}
      {#if SN[$currentMezig.links.indexOf(link)] === true}
        {#if $user_id !== null || link.isPublic === true}
          <LinkRS {link} />
        {/if}
      {/if}
    {/each}
  </div>

  