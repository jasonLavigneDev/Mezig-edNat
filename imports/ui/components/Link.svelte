<script>
  export let link;
</script>

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
</style>

<a target="_blank" href={link.URL}><li>{link.label}</li></a>
