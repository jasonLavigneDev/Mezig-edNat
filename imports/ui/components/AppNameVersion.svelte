<script>
  import PackageJSON from '../../../package.json';
  let version = PackageJSON.version;
  let name = PackageJSON.name;
</script>

<div>
  <span class="name">{name}</span>
  <span class="version">{version}</span>
</div>

<style>
  .name {
  }
  .version {
    opacity: 0.3;
  }
</style>
