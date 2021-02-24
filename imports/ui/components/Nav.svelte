<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Accounts } from 'meteor/accounts-base';
  import { onDestroy } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Menu from '@smui/menu/bare';
  import { Anchor } from '@smui/menu-surface/bare';
  import List, { Item, Separator, Text, PrimaryText, SecondaryText } from '@smui/list/bare';
  import '@smui/menu/bare.css';
  import '@smui/menu-surface/bare.css';
  import '@smui/list/bare.css';
  import '@smui/button/bare.css';
  import Mezigs from '../../api/mezigs/mezigs';
  import { link as routerLink, navigate } from 'svelte-routing';

  const blankUser = '/blank_user.svg';
  let menu;
  let anchor;

  export let userRedirect = false;
  export let profileOk = true;

  $: userId = useTracker(() => Meteor.userId());
  $: user = useTracker(() => Meteor.user());
  $: userMezig = useTracker(() => Mezigs.findOne({ username: $user ? $user.username : '' }));
  $: user && checkProfile();

  const checkProfile = () => {
    Meteor.call('mezigs.checkProfile', {}, (err, res) => {
      if (!err) profileOk = res;
    });
  };

  const keycloakLogin = () => {
    Meteor.loginWithKeycloak();
  };

  // detect account creation failure (i.e: if logging in from keycloak)
  const stopCallback = Accounts.onLoginFailure((details) => {
    if (details.error.error === 'api.users.createUser') userRedirect = true;
  });

  onDestroy(() => {
    stopCallback();
  });
</script>

<style>
  :root {
    --rad: 0.7rem;
    --dur: 0.3s;
    --color-dark: #2f2f2f;
    --color-light: #fff;
    --color-brand: #57bd84;
    --font-fam: 'Lato', sans-serif;
    --height: 3rem;
    --btn-width: 4rem;
    --bez: cubic-bezier(0, 0, 0.43, 1.49);
  }
  button {
    height: var(--height);
    font-family: var(--font-fam);
    border: 0;
    color: var(--color-dark);
    font-size: 1rem;
    font-weight: bold;
    background: var(--color-brand);
    border-radius: 10px;
  }
  .loginMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: var(--color-brand);
  }
  #loginUser {
    font-weight: bold;
    margin: 0;
    margin-right: 10%;
    color: var(--color-brand);
  }
  .loggedMenu{
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: 10%
  }
  * {
    align-items: center;
  }
  nav {
    width: 80vw;
    height: 8%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  span {
    width: 100%;
    position: absolute;
    top: 100%;
    border: solid whitesmoke 0.5px;
  }
  #ProfilPic {
    width: auto;
    max-height: 75%;
    border-radius: 50%;
    margin-right: 20%;
  }
  nav > div {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
  }
  #linkSearch {
    font-family: var(--font-fam);
    color: var(--color-light);
    font-size: 2vmin;
    text-decoration: none;
  }
  @media screen and (max-width: 1000px) {
  #linkSearch {
    font-size: 4vmin;
  }
  button{
    font-size: 2rem;
    height: 60%;
  }
}
</style>

<nav>
  <a id="linkSearch" href="/" use:routerLink>{$_('ui.search')}</a>
  {#if userRedirect === true}
    <div class="loginMsg">
      <p>{$_('ui.loginMsg')}<a href="#" on:click={keycloakLogin}>{$_('ui.loginLink')}</a></p>
      <button
        id="redirectButton"
        on:click={() => window.open('http://localhost:3000/signin', '_blank')}>{$_('ui.loginLaboite')}</button>
    </div>
  {:else}
    <div class="loginMenu">
      {#if $userId === null}
        <button id="buttonConnect" on:click={keycloakLogin}>{$_('ui.connection')}</button>
      {:else}
      <div class="loggedMenu">
        {#await Meteor.subscribe('mezigs.self')}
          <h1 id="loginUser">{($user || { firstName: '' }).firstName}</h1>
        {:then}
          <h1 id="loginUser">{($user || { firstName: '' }).firstName}</h1>
          {#if $userMezig}
            <img
            bind:this={anchor}


              id="ProfilPic"
              src={$userMezig.profilPic || blankUser}
              alt="Avatar"
              on:click={() => menu.setOpen(true)}
              use:Anchor />
            <Menu bind:this={menu} anchor={true} bind:anchorElement={anchor} anchorCorner="BOTTOM_LEFT">
              <List twoLine>
                <Item on:SMUI:action={() => navigate('/profil/' + $userMezig.publicName, { replace: false })}>
                  <Text class="MenuText">
                    <PrimaryText>{$_('ui.profil')}</PrimaryText>
                    <SecondaryText>{$_('ui.profilSub')}</SecondaryText>
                  </Text>
                </Item>
                <Item on:SMUI:action={() => navigate('/edit', { replace: false })}>
                  <Text class="MenuText">
                    <PrimaryText>{$_('ui.edit')}</PrimaryText>
                    <SecondaryText>{$_('ui.editSub')}</SecondaryText>
                  </Text>
                </Item>
                <Separator />
                <Item on:SMUI:action={() => Meteor.logout()}>
                  <Text class="MenuText">
                    <PrimaryText>{$_('ui.disconnection')}</PrimaryText>
                    <SecondaryText>{$_('ui.disconnectionSub')}</SecondaryText>
                  </Text>
                </Item>
              </List>
            </Menu>  
          {/if}
        {/await}
      </div>
        {/if}
    </div>
  {/if}
  <span />
  <!-- Separator -->
</nav>
