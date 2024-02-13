<script>
  import { _ } from 'svelte-i18n';
  import { toast } from '@zerodevx/svelte-toast';

  export let showModal;
  export let browser;
  export let os;
  export let platform;

  let dialog; // HTMLDialogElement

  const handleClickModal = () => {
    navigator.clipboard.writeText(
      `Navigateur: ${browser.name},
                   Version: ${JSON.stringify(browser.version)},
                   Os: ${JSON.stringify(os.name)},
                   Appareil: ${JSON.stringify(platform.type)}`,
    );
    toast.push($_('ui.AboutPage.Modal.success'));
    dialog.close();
  };

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />

    <slot />

    <!-- svelte-ignore a11y-autofocus -->
    <button class="buttonInfos" autofocus on:click={() => dialog.close()}>{$_('ui.AboutPage.Modal.close')}</button>
    <button class="buttonInfos" on:click={() => handleClickModal()}>{$_('ui.AboutPage.Modal.copy')}</button>
  </div>
</dialog>

<style>
  dialog {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }
  .buttonInfos {
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 8px;
    color: #fff;
    background-color: #011caa;
    border: none;
    cursor: pointer;
  }
</style>
