<script>
  import { _ } from 'svelte-i18n';

  const { enableKeycloak, laboiteUrl } = Meteor.settings.public;

  const doLogin = () => {
    if (enableKeycloak === true) {
      Meteor.loginWithKeycloak();
    } else {
      navigate('/signin', { replace: false });
    }
  };
</script>

<svelte:head>
  <title>No account</title>
</svelte:head>

<div class="NoAccount">
  <div class="loginMsg">
    <p>{$_('ui.loginMsg')}<a href="#" on:click={doLogin}>{$_('ui.loginLink')}</a></p>
    <button id="redirectButton" on:click={() => window.open(`${laboiteUrl}/signin`, '_blank')} class="laboiteButton"
      >{$_('ui.loginLaboite')}
    </button>
  </div>
</div>

<style>
  .NoAccount {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .loginMsg {
    display: flex;
    flex-direction: column;
    margin-top: 15%;
    font-weight: bold;
    color: var(--color-brand);
  }

  button {
    height: var(--height);
    border: 0;
    padding: 10px;
    color: white;
    font-size: 0.875rem;
    font-weight: normal;
    background: var(--color-brand);
    border-radius: 10px;
    cursor: pointer;
  }
</style>
