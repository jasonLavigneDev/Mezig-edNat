<script>
  export let link;
  let nonPublic = !link.isPublic;

  import tabSN from '../../api/mezigs/social-network.json'

</script>

<style>
  a {
    color: var(--color-brand);
    text-decoration: none;
    margin: 0% 5%;
  }
  svg {
    height: 6vh;
  }
  path {
    fill: var(--color-brand);
  }
  .nonPublic {
    fill: var(--color-orange);
  }
</style>

{#each Object.keys(tabSN) as NomSN}

  {#if link.URL.includes(NomSN)}
    <a target="_blank" href={link.URL} title={link.label}><svg
        enable-background="new 0 0 24 24"
        viewBox="0 0 24 24"
        alt="Logo {NomSN}"><path class:nonPublic d={tabSN[NomSN]["svg"]} /></svg></a>
  {/if}
{/each}
