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
  import { Item, Meta } from '@smui/list/bare';
  import '@smui/list/bare.css';
  import { createEventDispatcher } from 'svelte';

  export let mezigLink;
  export let linkIndex;

  const dispatch = createEventDispatcher();
</script>

<style>
  * :global(.FullWidth) {
    width: 100%;
  }
</style>

<Item>
  <FormField>
    <Textfield class="FullWidth" bind:value={mezigLink.label} label={$_('ui.editLink.label')} />
  </FormField>
  <FormField>
    <Textfield class="FullWidth" bind:value={mezigLink.URL} label={$_('ui.editLink.url')} />
  </FormField>
  <FormField>
    <Switch bind:checked={mezigLink.isPublic} />
    <span slot="label">{$_('ui.editLink.showLink')}</span>
  </FormField>
  <FormField>
    <Switch bind:checked={mezigLink.isSocialNetwork} />
    <span slot="label">{$_('ui.editLink.socialNetwork')}</span>
  </FormField>
  <Meta>
    <Icon
      class="material-icons"
      trailing
      on:click={() => {
        dispatch('deleteLink', { index: linkIndex });
      }}>
      cancel
    </Icon>
  </Meta>
</Item>
