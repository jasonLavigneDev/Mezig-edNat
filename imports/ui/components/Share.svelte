<script>
  import FormField from '@smui/form-field/bare';
  import '@smui/form-field/bare.css';
  import Textfield from '@smui/textfield/bare';
  import '@smui/textfield/bare.css';
  import Switch from '@smui/switch/bare';
  import '@smui/switch/bare.css';
  import Button from '@smui/button/bare';
  import '@smui/button/bare.css';
  import Snackbar, { Label } from '@smui/snackbar/bare';
  import '@smui/snackbar/bare.css';
  import IconButton, { Icon } from '@smui/icon-button/bare';
  import '@smui/icon-button/bare.css'
  import Paper from '@smui/paper/bare';
  import '@smui/paper/bare.css';
  import Chip, { Set, Text } from '@smui/chips/bare';
  import '@smui/chips/bare.css';
  
  import { _ } from 'svelte-i18n';

    let mySnackbar;

    function handleCopy(){
        var dummy = document.createElement('input'),
        text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        mySnackbar.open();
    }
</script>

<style>
.shareLink{
    cursor: pointer;
    color: whitesmoke;
    position: absolute;
    top: 30vh;
    left: 57%;
}
</style>

    <div class="shareLink">
              <Icon
              title={$_('ui.share')}
                on:click={handleCopy}
                class="material-icons"
                trailing
                >
                  link
              </Icon>
    </div>

<Snackbar bind:this={mySnackbar}>
    <Label>{$_('ui.copiedLink')}</Label>
</Snackbar>