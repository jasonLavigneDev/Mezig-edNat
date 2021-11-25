<script>
  import { Accounts } from 'meteor/accounts-base';
  import { _ } from 'svelte-i18n';
  import { navigate } from 'svelte-routing';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import '@smui/dialog/bare.css';
  import Textfield from '@smui/textfield';
  import '@smui/textfield/bare.css';
  import Button, { Label } from '@smui/button';
  import '@smui/button/bare.css';

  export let location = null;
  let simpleDialog = null;
  let email = '';
  let firstName = '';
  let lastName = '';
  let password = '';
  let confirm = '';
  let error = '';

  const validateForm = (email, password, confirm, firstName, lastName) => {
    return email != '' && password != '' && password == confirm && firstName != '' && lastName != '';
  };

  $: formValid = validateForm(email, password, confirm, firstName, lastName);

  const handleSubmit = () => {
    // Accounts.createUserVerifyingEmail({ username:email, email, password }); ???
    Accounts.createUser({ username: email, email, password, firstName, lastName }, (err) => {
      if (err) {
        error = `${$_('ui.Signup.createError')} : ${err.reason ? err.reason : err.message}`;
        simpleDialog.setOpen(true);
      } else {
        navigate(`/edit`, { state: `/edit` });
      }
    });
  };
</script>

<svelte:head>
  <title>{$_('ui.Signup.title')} | {$_('ui.appName')}</title>
</svelte:head>

<form on:submit|preventDefault>
  <div class="registerMsg">
    <h1>
      {$_('ui.Signup.registerMsg')}
    </h1>
  </div>
  <div class="MezigField">
    <Textfield class="FullWidth" variant="outlined" bind:value={email} label={$_('ui.Signin.email')} />
  </div>
  <div class="MezigField">
    <Textfield class="FullWidth" variant="outlined" bind:value={firstName} label={$_('ui.Signup.firstName')} />
  </div>
  <div class="MezigField">
    <Textfield class="FullWidth" variant="outlined" bind:value={lastName} label={$_('ui.Signup.lastName')} />
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
  <div class="MezigField">
    <Textfield
      class="FullWidth"
      type="password"
      variant="outlined"
      bind:value={confirm}
      label={$_('ui.Signup.confirm')}
    />
  </div>
  <div class="rightButton">
    <Button on:click={handleSubmit} style="margin: 3%; font-size: 1.2rem;" disabled={!formValid} variant="raised"
      >{$_('ui.Signup.submit')}</Button
    >
  </div>
</form>
<Dialog bind:this={simpleDialog} aria-labelledby="simple-title" aria-describedby="simple-content">
  <Title id="simple-title">Error</Title>
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
  .registerMsg {
    display: flex;
    justify-content: space-between;
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
</style>
