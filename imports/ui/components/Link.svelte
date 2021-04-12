<script>
  export let link;
  let nonPublic = !link.isPublic;
</script>

<a target="_blank" href={link.URL}>
  <li class:nonPublic>
    {#if link.favicon}
      <img src={link.favicon} alt="" class="favicon" />
    {/if}
    {link.label}
  </li>
</a>

<style>
  li {
    max-width: 85%;
    margin: 5% auto;
    position: relative;
    list-style: none;
    padding: 15px;
    border-bottom: #eee solid 1px;
    text-align: center;
    border-radius: 7px;
    border: 2px solid white;
  }
  a {
    height: 100%;
    widows: 100%;
    color: white;
    text-decoration: none;
  }
  .nonPublic {
    border: 2px solid #ff3e00;
    color: #ff3e00;
  }
  .favicon {
    vertical-align: middle;
    width: 40px;
    margin-right: 10px;
  }
</style>
