<script>
  import { _ } from 'svelte-i18n';
  import FormField from '@smui/form-field/bare';
  import '@smui/form-field/bare.css';
  import Textfield from '@smui/textfield/bare';
  import '@smui/textfield/bare.css';
  import Switch from '@smui/switch/bare';
  import '@smui/switch/bare.css';
  import { Icon, Text } from '@smui/chips/bare';
  import '@smui/chips/bare.css';
  import Button from '@smui/button/bare';
  import '@smui/button/bare.css';
  import { createEventDispatcher } from 'svelte';

  export let mezigLink;
  export let linkIndex;
  let supprAlert = false;

  const dispatch = createEventDispatcher();


function dispAlert(){
  supprAlert = !supprAlert;
}

</script>

<style>
  * :global(.FullWidth) {
    width: 100%;
  }
  .link{
    display: flex;
    padding: 3%;
  }
  .link:hover{
    background-color: rgba(30, 30, 90, 0.1);
  }
  .switch{
    margin-left: 3%;
    display: flex;
    text-align: center;
  }
  #suppr:hover{
    color:crimson;
    cursor: pointer;
  }
  #suppr{
    height: 35%;
  }
  .supprDialog{
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 5% 0%;
  }
</style>

{#if supprAlert == false}
<div class="link">
  <FormField>
    <Textfield class="FullWidth" bind:value={mezigLink.label} label={$_('ui.editLink.label')} />
  </FormField>
  <FormField>
    <Textfield class="FullWidth" bind:value={mezigLink.URL} label={$_('ui.editLink.url')} />
  </FormField>
  <div class="switch">
  <FormField >
    <Switch bind:checked={mezigLink.isPublic} />
    <span slot="label">{$_('ui.editLink.showLink')}</span>
  </FormField>
  </div>
  <div id="suppr">
    <Icon
      on:click={dispAlert}
      class="material-icons"
      trailing
    >
        cancel
    </Icon>
  </div>
</div>
{/if}
{#if supprAlert == true}
<div class="supprDialog">
  <FormField>
    <span>{$_('ui.delLink')}</span>
    <Button on:click={dispAlert, () => {
      dispatch('deleteLink', { index: linkIndex });
    }}>
  {$_('ui.yes')}
</Button>
<Button on:click={dispAlert}>
  {$_('ui.no')}
</Button>
  </FormField>
</div>
{/if}
