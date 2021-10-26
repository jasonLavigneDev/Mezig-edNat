<script>
  import { Meteor } from 'meteor/meteor';
  import { Roles } from 'meteor/alanning:roles';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Accounts } from 'meteor/accounts-base';
  import { onDestroy } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Menu from '@smui/menu';
  import { Anchor } from '@smui/menu-surface';
  import List, { Item, Separator, Text, PrimaryText, SecondaryText } from '@smui/list';
  import '@smui/menu/bare.css';
  import '@smui/menu-surface/bare.css';
  import '@smui/list/bare.css';
  import Mezigs from '../../api/mezigs/mezigs';
  import { link as routerLink, navigate } from 'svelte-routing';

  const blankUser = '/blank_user.svg';
  let menu;
  let anchor;
  let isAdmin = false;
  const { enableKeycloak, laboiteUrl } = Meteor.settings.public;

  export let userRedirect = false;
  export let profileOk = true;
  export let userActive = false;

  const userId = useTracker(() => Meteor.userId());
  const user = useTracker(() => Meteor.user());
  const roles = useTracker(() => Meteor.roleAssignment.find().fetch());
  $: userMezig = useTracker(() => Mezigs.findOne({ username: $user ? $user.username : '' }));
  $: if (!!$user) userActive = $user.isActive;
  $: !!$userMezig && checkProfile();
  $: isAdmin = !!$roles && Roles.userIsInRole($userId, 'admin');
  // make sure that profileOk and isActive are reset when logging out
  $: if ($userId === null) {
    profileOk = true;
    userActive = true;
  }

  const checkProfile = () => {
    Meteor.call('mezigs.checkProfile', {}, (err, res) => {
      if (!err) profileOk = res;
    });
  };

  const doLogin = () => {
    if (enableKeycloak === true) {
      Meteor.loginWithKeycloak();
    } else {
      navigate('/signin', { replace: false });
    }
  };

  // detect account creation failure (i.e: if logging in from keycloak)
  const stopCallback = Accounts.onLoginFailure((details) => {
    if (details.error.error === 'api.users.createUser') userRedirect = true;
  });

  onDestroy(() => {
    stopCallback();
  });
</script>

<nav>
  <a id="linkSearch" href="/" use:routerLink>{$_('ui.search')}</a>
  {#if userRedirect === true}
    <div class="loginMsg">
      <p>{$_('ui.loginMsg')}<a href="#" on:click={doLogin}>{$_('ui.loginLink')}</a></p>
      <button id="redirectButton" on:click={() => window.open(`${laboiteUrl}/signin`, '_blank')}
        >{$_('ui.loginLaboite')}
      </button>
    </div>
  {:else}
    <div class="loginMenu">
      {#if $userId === null}
        <button id="buttonConnect" on:click={doLogin}>{$_('ui.connection')}</button>
      {:else}
        <div class="loggedMenu">
          {#await Meteor.subscribe('mezigs.self')}
            <h1 id="loginUser">{($user || { firstName: '' }).firstName}</h1>
          {:then}
            {#if $userMezig}
              <div class="userInfo" on:click={() => menu.setOpen(true)}>
                <h1 id="loginUser">
                  {($user || { firstName: '' }).firstName}
                </h1>
                <img id="ProfilPic" src={$userMezig.profilPic || blankUser} alt="Avatar" />
                <div id="menuAnchor" bind:this={anchor} use:Anchor />
              </div>
              <Menu bind:this={menu} anchor={true} bind:anchorElement={anchor} anchorCorner="BOTTOM_RIGHT">
                <List twoLine>
                  <Item on:SMUI:action={() => navigate('/profil/' + $userMezig.publicName, { replace: false })}>
                    <Text class="MenuText">
                      <PrimaryText>{$_('ui.profil')}</PrimaryText>
                      <SecondaryText>{$_('ui.profilSub')}</SecondaryText>
                    </Text>
                  </Item>
                  {#if userActive === true}
                    <Item on:SMUI:action={() => navigate('/edit', { replace: false })}>
                      <Text class="MenuText">
                        <PrimaryText>{$_('ui.edit')}</PrimaryText>
                        <SecondaryText>{$_('ui.editSub')}</SecondaryText>
                      </Text>
                    </Item>
                    {#if isAdmin && !laboiteUrl}
                      <Item on:SMUI:action={() => navigate('/admin', { replace: false })}>
                        <Text class="MenuText">
                          <PrimaryText>{$_('ui.admin')}</PrimaryText>
                          <SecondaryText>{$_('ui.adminSub')}</SecondaryText>
                        </Text>
                      </Item>
                    {/if}
                  {/if}
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
  .userInfo {
    display: flex;
    cursor: pointer;
    justify-content: flex-end;
    height: inherit;
  }
  #loginUser {
    display: flex;
    font-weight: bold;
    margin: 0;
    margin-right: 10%;
    color: var(--color-brand);
  }
  #menuAnchor {
    display: flex;
    height: 100%;
  }
  .loggedMenu {
    display: flex;
    height: 100%;
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
    display: flex;
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
  div {
    display: contents;
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
    button {
      font-size: 2rem;
      height: 60%;
    }
  }
</style>
