<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink, navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import '@smui/dialog/bare.css';
  import Textfield from '@smui/textfield';
  import '@smui/textfield/bare.css';
  import Button, { Label } from '@smui/button';
  import '@smui/button/bare.css';
  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'

  export let location = null;
  let simpleDialog = null;
  let email = '';
  let password = '';
  let error = '';

  const validateForm = (email, password) => {
    return email != '' && password != '';
  };

  $: user_id = useTracker(() => Meteor.userId());
  $: formValid = validateForm(email, password);

  const handleSubmit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        error = $_('ui.Signin.loginError');
        simpleDialog.setOpen(true);
      } else {
        navigate(`/search`, { state: `/search` });
      }
    });
  };
</script>

<svelte:head>
  <title>{$_('ui.Signin.title')} | {$_('ui.appName')}</title>
</svelte:head>

<form on:submit|preventDefault>
  <div class="loginMsg">
    <h1>
      {$_('ui.Signin.loginMsg')}
    </h1>
    <a
      href="#"
      on:click={() => {
        Meteor.settings.public.laboiteUrl
          ? window.open(`${Meteor.settings.public.laboiteUrl}/signup`, '_blank')
          : navigate(`/signup`, { state: `/signup` });
      }}>{$_('ui.Signin.signupMsg')}</a
    >
  </div>
  <div class="MezigField">
    <Textfield class="FullWidth" variant="outlined" bind:value={email} label={$_('ui.Signin.email')} />
  </div>
  <div class="MezigField">
    <Textfield
      class="FullWidth"
      type="password"
      variant="outlined"
      bind:value={password}
      label={$_('ui.Signin.password')}
    />
  </div>
  <div class="rightButton">
    <Button on:click={handleSubmit} style="margin: 3%; font-size: 1.2rem;" disabled={!formValid} variant="raised"
      >{$_('ui.Signin.submit')}</Button
    >
  </div>
</form>
<Dialog bind:this={simpleDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
  <Title id="simple-title">{$_('ui.Signin.error')}</Title>
  <Content id="simple-content">
    {error}
  </Content>
  <Actions>
    <Button>
      <Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  h1 {
    border-bottom: 5px;
    font-size: 1rem;
    font-weight: bold;
  }
  form {
    transition-duration: 0.7s;
    position: absolute;
    left: 50%;
    top: 13%;
    transform: translate(-50%, 0%);
    width: 40rem;
    max-width: 90vw;
    background: #fff;
    border-radius: var(--rad);
    padding: 15px;
  }
  .MezigField {
    margin: 10px auto;
  }
  * :global(.FullWidth) {
    width: 100%;
  }
  .rightButton {
    text-align: right;
  }
  .loginMsg {
    display: flex;
    justify-content: space-between;
  }
</style>
