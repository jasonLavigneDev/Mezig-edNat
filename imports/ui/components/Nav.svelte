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
  import IconButton from '@smui/icon-button';
  import { Group, Label, Icon } from '@smui/button';
  import Tooltip from './Tooltip.svelte';

  const blankUser = '/blank_user.svg';
  const logoApps = '/apps-logo-sansfond.svg';
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

  // Give focus on textfield in search page
  const handleFocusTextfield = () => {
    const searchField = document.getElementById('search');
    if (searchField === null) {
      navigate('/');
    } else {
      searchField.focus();
    }
  };

  const handleMenu = () => {
    menu.setOpen(!menu.isOpen());
  };

  const handleDisconnection = () => {
    Meteor.logout(() => {
      if (window.location.pathname === '/edit') {
        navigate('/');
      } else {
        window.location.reload(false);
      }
    });
  };
</script>

<nav>
  <img id="logo" src={logoApps} alt="Logo de l'application" />
  <Tooltip text="Rechercher" bottom>
    <IconButton
      class="material-icons"
      id="searchButton"
      role="button"
      aria-label="Bouton de recherche"
      on:click={handleFocusTextfield}
    >
      search
    </IconButton>
  </Tooltip>
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
              <Group>
                <button class="userInfo" aria-level="1" aria-label="Menu du profil" tabindex="0" on:click={handleMenu}>
                  <Label id="loginUser">
                    {($user || { firstName: '' }).firstName}
                  </Label>
                  <img id="ProfilPic" src={$userMezig.profilPic || blankUser} alt="Avatar" />
                  <Icon class="material-icons">expand_more</Icon>
                  <div id="menuAnchor" bind:this={anchor} use:Anchor />
                </button>
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
                    <Item on:SMUI:action={handleDisconnection}>
                      <Text class="MenuText">
                        <PrimaryText>{$_('ui.disconnection')}</PrimaryText>
                        <SecondaryText>{$_('ui.disconnectionSub')}</SecondaryText>
                      </Text>
                    </Item>
                  </List>
                </Menu>
              </Group>
            {/if}
          {/await}
        </div>
      {/if}
    </div>
  {/if}
</nav>

<style>
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
    background: unset;
    color: unset;
  }
  #loginUser {
    display: flex;
    margin: 0;
    margin-right: 10%;
    color: var(--color-brand);
  }
  #buttonConnect {
    color: var(--color-brand);
    background-color: white;
    font-weight: normal;
    text-transform: uppercase;
    font-size: 0.875rem;
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
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    background-color: white;
    width: 100%;
    height: 48px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  #ProfilPic {
    display: flex;
    width: auto;
    min-height: 25%;
    max-height: 80%;
    border-radius: 50%;
    margin-left: 20%;
    margin-right: 10%;
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
  #logo {
    max-height: 30px;
    height: 30px;
    outline: none;
    padding-left: 16px;
  }
</style>
