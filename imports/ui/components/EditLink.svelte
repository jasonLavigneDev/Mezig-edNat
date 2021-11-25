<script>
  import { _ } from 'svelte-i18n';
  import FormField from '@smui/form-field';
  import '@smui/form-field/bare.css';
  import Textfield from '@smui/textfield';
  import '@smui/textfield/bare.css';
  import Switch from '@smui/switch';
  import '@smui/switch/bare.css';
  import Button from '@smui/button';
  import '@smui/button/bare.css';
  import { createEventDispatcher } from 'svelte';
  import IconButton from '@smui/icon-button';
  import '@smui/icon-button/bare.css';
  export let mezigLink;
  export let linkIndex;
  let supprAlert = false;

  const dispatch = createEventDispatcher();

  function dispAlert() {
    supprAlert = !supprAlert;
  }

  const onChange = (e) => {
    const http = new RegExp('(https?://)');
    if (http.test(e.target.value) == false) {
      e.target.value = 'https://' + e.target.value;
      mezigLink.URL = e.target.value;
      dispatch('updateLink');
    }
  };
</script>

{#if supprAlert == false}
  <div class="link">
    <span class="grippy" />
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
        on:change={onChange}
        label={$_('ui.editLink.url')}
        on:input={() => {
          dispatch('updateLink');
        }}
      />
    </FormField>
    <div class="switch">
      <FormField>
        <Switch color="primary" bind:checked={mezigLink.isPublic} />
        <span slot="label">{$_('ui.editLink.showLink')}</span>
      </FormField>
    </div>
    <div id="suppr">
      <IconButton
        title={$_('ui.delLinkTitle')}
        on:click={dispAlert}
        class="material-icons"
        style="position: relative;left: 10px;">cancel</IconButton
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
  span.grippy {
    content: '....';
    width: 10px;
    height: 40px;
    display: inline-block;
    overflow: hidden;
    line-height: 7px;
    padding: 3px 4px;
    cursor: grab;
    vertical-align: middle;
    margin-top: 0.3em;
    margin-right: 0.3em;
    margin-left: -0.2em;
    font-size: 12px;
    letter-spacing: 2px;
    color: #cccccc;
    text-shadow: 1px 0 1px black;
  }
  span.grippy::after {
    content: '.. .. .. .. .. ..';
  }
  * :global(.FullWidth) {
    width: 100%;
  }
  .link {
    display: flex;
    padding: 6px;
    cursor: grab;
    align-items: center;
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
