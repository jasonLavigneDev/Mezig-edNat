<script>
  import Tooltip from './Tooltip.svelte';
  import { _ } from 'svelte-i18n';
  export let link;
  let nonPublic = !link.isPublic;
</script>

<a target="_blank" href={link.URL}>
  <li class:nonPublic>
    {#if nonPublic === true}
      <div class="iconPosition">
        <Tooltip text={$_('ui.privateLink')} bottomRight>
          <span class="material-icons" id="iconNonPublic" aria-label={$_('ui.privateLink')}>disabled_visible</span>
        </Tooltip>
      </div>
    {/if}
    {#if link.favicon}
      <img src={link.favicon} alt="website icon" class="favicon" />
    {:else}
      <span class="material-icons favicon">language</span>
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
    padding: 5px;
    border-bottom: #011caa 1px;
    text-align: center;
    border-radius: 7px;
    border: 2px solid #011caa;
    background-color: whitesmoke;
  }
  a {
    height: 100%;
    widows: 100%;
    color: black;
    font-size: 1.5vmin;
    text-decoration: none;
  }
  .nonPublic {
    border: 2px solid #e48231;
  }
  .favicon {
    vertical-align: middle;
    text-align: left;
    width: 40px;
    font-size: 40px;
  }
  .iconPosition {
    position: relative;
    text-align: right;
    padding: unset;
    margin-bottom: -30px;
  }
</style>
