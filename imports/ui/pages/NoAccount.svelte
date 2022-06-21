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

<div class="NoAccount">
  <div class="loginMsg">
    <p>{$_('ui.loginMsg')}<a href="#" on:click={doLogin}>{$_('ui.loginLink')}</a></p>
    <button id="redirectButton" on:click={() => window.open(`${laboiteUrl}/signin`, '_blank')}
      >{$_('ui.loginLaboite')}
    </button>
  </div>
</div>

<style>
.NoAccount {
    display: flex;
    justify-content: center;
  }

.loginMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }
</style>