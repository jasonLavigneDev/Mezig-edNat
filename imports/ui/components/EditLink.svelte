<script>
  import { _ } from 'svelte-i18n';
  import FormField from '@smui/form-field/bare';
  import '@smui/form-field/bare.css';
  import Textfield from '@smui/textfield/bare';
  import '@smui/textfield/bare.css';
  import Switch from '@smui/switch/bare';
  import '@smui/switch/bare.css';
  import { Icon } from '@smui/chips/bare';
  import '@smui/chips/bare.css';
  import Button from '@smui/button/bare';
  import '@smui/button/bare.css';
  import { createEventDispatcher } from 'svelte';

  export let mezigLink;
  export let linkIndex;
  let supprAlert = false;

  const dispatch = createEventDispatcher();

  function dispAlert() {
    supprAlert = !supprAlert;
  }
</script>

{#if supprAlert == false}
  <div class="link">
    <FormField>
      <Textfield
        class="FullWidth"
        bind:value={mezigLink.label}
        label={$_('ui.editLink.label')}
        on:input={() => {
          dispatch('updateLink');
        }}
      />
    </FormField>
    <FormField>
      <Textfield
        class="FullWidth"
        bind:value={mezigLink.URL}
        label={$_('ui.editLink.url')}
        on:input={() => {
          dispatch('updateLink');
        }}
      />
    </FormField>
    <div class="switch">
      <FormField>
        <Switch bind:checked={mezigLink.isPublic} />
        <span slot="label">{$_('ui.editLink.showLink')}</span>
      </FormField>
    </div>
    <div id="suppr">
      <Icon
        title={$_('ui.delLinkTitle')}
        on:click={dispAlert}
        class="material-icons"
        style="top: 16px;position: relative;left: 30px;"
      >cancel</Icon
      >
    </div>
  </div>
{/if}
{#if supprAlert == true}
  <div class="supprDialog">
    <p>{$_('ui.delLink')}</p>
    <div class="buttonDel">
      <Button
        class="marginButton"
        on:click={(supprAlert = !supprAlert)}
        on:click={() => {
          dispatch('deleteLink', { index: linkIndex });
        }}
      >
        {$_('ui.yes')}
      </Button>
      <Button on:click={dispAlert}>
        {$_('ui.no')}
      </Button>
    </div>
  </div>
{/if}

<style>
  * :global(.FullWidth) {
    width: 100%;
  }
  .link {
    display: flex;
    padding: 3%;
  }
  .link:hover {
    background-color: rgba(30, 30, 90, 0.1);
  }
  .switch {
    margin-left: 3%;
    display: flex;
    text-align: center;
  }
  #suppr:hover {
    color: crimson;
    cursor: pointer;
  }
  #suppr {
    height: 35%;
    color: grey;
    position: relative;
  }
  .supprDialog {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 5% 0%;
  }
  .buttonDel {
    margin-left: 3%;
    display: flex;
    align-items: center;
  }
</style>
