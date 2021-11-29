<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink, navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';

  import Spinner from '../components/Spinner.svelte';
  import EditTableLinks from '../components/EditTableLinks.svelte';

  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import '@smui/dialog/bare.css';
  import Chip, { Set, TrailingAction, Text } from '@smui/chips';
  import '@smui/chips/bare.css';
  import Textfield from '@smui/textfield';
  import '@smui/textfield/bare.css';
  import CharacterCounter from '@smui/textfield/character-counter';
  import '@smui/textfield/character-counter/bare.css';
  import Button, { Label } from '@smui/button';
  import '@smui/button/bare.css';
  import FormField from '@smui/form-field';
  import '@smui/form-field/bare.css';
  import Switch from '@smui/switch';
  import '@smui/switch/bare.css';

  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'
  import PackageJSON from '../../../package.json';
  let version = PackageJSON.version;

  export let profileOk = true;
  export let location = null;
  let simpleDialogSuppr;
  let errorDialog;
  let loading = true;
  let whitelist = true;
  let publicName = '';
  let biography = '';
  let profilPic = '';
  let links = [];
  let sortedLinks = [];
  let sortableDiv;  
  let skills = [];
  const maxSkillsCar = 32;
  let newSkill = '';
  let error = '';
  let email = '';

  const validateForm = (publicName, links) => {
    publicNameOK = publicName !== '';
    // No empty values in links
    linksOK = links.reduce((acc, cur) => acc && cur.label != '' && cur.URL != '', true);
    return publicNameOK && linksOK;
  };

  const initData = (mezig) => {
    if (mezig && mezig.links) {
      if (loading) {
        whitelist = !mezig.blacklist;
        publicName = mezig.publicName;
        biography = mezig.biography || '';
        email = mezig.email || '';
        profilPic = mezig.profilPic || '';
        links = mezig.links || [];
        skills = mezig.skills || [];
        loading = false;
      }
    }
  };

  $: user_id = useTracker(() => Meteor.userId());
  $: currentMezig = useTracker(() => {
    const user = Meteor.users.findOne({ _id: $user_id }) || { username: '' };
    return Mezigs.findOne({ username: user.username });
  });
  $: initData($currentMezig);
  $: formValid = validateForm(publicName, links);

  const handleSubmit = () => {
    notSortedLinks = [...links];
    sortableDivChild = sortableDiv.children;
    for (let i = 0; i < sortableDivChild.length; i++) {
      y = sortableDivChild[i].id;
      sortedLinks[i] = notSortedLinks[y];
    }
    links = sortedLinks;
    userData = {
      blacklist: !whitelist,
      publicName,
      biography,
      profilPic,
      links,
      skills,
      email: email || null,
      profileChecked: true,
    };
    Meteor.call('mezigs.updateMezig', { mezigId: $currentMezig._id, data: userData }, (err) => {
      if (err) {
        error = err.message;
        errorDialog.setOpen(true);
      } else {
        // set loading to true to permit reload from api
        profileOk = true;
        navigate(`/profil/${publicName}`, { state: `/profil/${publicName}` });
      }
    });
  };

  const handleCancel = () => {
    // set loading to true to permit reload from api
    profileOk = true;
    navigate(`/profil/${$currentMezig.publicName}`, { state: `/profil/${$currentMezig.publicName}` });
  };

  const handleDelete = () => {
    // set loading to true to permit reload from api
    Meteor.call('mezigs.removeMezig', { mezigId: $currentMezig._id }, (err) => {
      if (err) {
        error = err.message;
        simpleDialogSuppr.open();
      } else {
        // set loading to true to permit reload from api
        Meteor.logout();
        navigate(`/`, { state: `/` });
      }
    });
  };

  const handleUpdateLinks = () => {
    // 'updateLink' event emit by EditLink component on input values in label and URL fields
    // => update links array to dynamicaly launch validateForm
    // https://svelte.dev/tutorial/updating-arrays-and-objects
    links = links;
  };

  const addSkill = () => {
    skills.push(newSkill.replaceAll(' ', '_'));
    // svelte does not seem to react to push
    skills = skills;
    newSkill = '';
  };

  // Add skills with pressing Enter key
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      // Delete other Enter event
      event.preventDefault();
      if (newSkill != '') {
        addSkill();
      }
    }
  };
</script>

<svelte:head>
  <title>{$_('ui.editProfil.title')} | {$_('ui.appName')} {version}</title>
</svelte:head>

{#if $user_id === null}
  <h1>{$_('api.notLoggedIn')}</h1>
{:else}
  {#await Meteor.subscribe('mezigs.self')}
    <Spinner />
  {:then}
    {#if $currentMezig}
      <form on:submit|preventDefault>
        {#if profileOk === false}<span class="validationNeeded">{$_('ui.editProfil.validationNeeded')} </span>{/if}
        <div class="MezigField center">
          <FormField>
            <Switch color="primary" bind:checked={whitelist} />
            <span slot="label">{$_('ui.editProfil.showProfile')}</span>
          </FormField>
        </div>
        <div class="MezigField">
          <Textfield
            style="width: 100%;"
            variant="outlined"
            bind:value={publicName}
            label={$_('ui.editProfil.publicName')}
          />
        </div>
        <div class="MezigField">
          <Textfield style="width: 100%;" variant="outlined" bind:value={email} label={$_('ui.editProfil.email')} />
        </div>
        <div class="MezigField">
          <Textfield
            textarea
            style="width: 100%;"
            helperLine$style="width: 100%;"
            bind:value={biography}
            label={$_('ui.editProfil.biography')}
          />
        </div>
        <div class="part">
          <p class="partTitle">{$_('ui.editProfil.skills')}</p>
          <Set chips={skills} let:chip>
            <Chip {chip}>
              <Text>{chip}</Text>
              <TrailingAction id="cancel" icon$class="material-icons">cancel</TrailingAction>
            </Chip>
          </Set>
          <div class="MezigField center">
            <FormField>
              <Textfield
                bind:value={newSkill}
                label={$_('ui.editProfil.newSkill')}
                input$maxlength={maxSkillsCar}
                on:keydown={handleEnter}
              >
                <span slot="helper"><CharacterCounter>0 / {maxSkillsCar}</CharacterCounter></span>
              </Textfield>
              <div class="spaceAround">
                <Button
                  class="spaceAround"
                  variant="raised"
                  on:click={addSkill}
                  disabled={newSkill === '' || skills.indexOf(newSkill) !== -1}
                >
                  <Label>{$_('ui.editProfil.addSkills')}</Label>
                </Button>
              </div>
            </FormField>
          </div>
        </div>
        <div class="part">
          <p class="partTitle" style="margin-bottom: 0">{$_('ui.editProfil.links')}</p>
          <EditTableLinks bind:sortableDiv bind:links on:updateLink={handleUpdateLinks} />
        </div>
        <div class="center">
          <Button
            on:click={handleCancel}
            style="margin: 3%; font-size: 1.2rem; background-color: #d5d5d5; color: black;"
          >
            {$_('ui.editProfil.cancel')}
          </Button>
          <Button
            on:click={handleSubmit}
            style="margin: 3%; font-size: 1.2rem; background-color: #011CAA; color: white;"
            disabled={!formValid}
            variant="raised"
          >
            {$_('ui.editProfil.submit')}
          </Button>
        </div>
        <div class="center">
          <Button
            on:click={() => {
              simpleDialogSuppr.open();
            }}
            style="margin: 3%; font-size: 1.2rem; background-color: #E48231; color:white; font-weight:bold"
            variant="raised"
          >
            {$_('ui.editProfil.delete')}
          </Button>
        </div>
      </form>
      <Dialog bind:this={errorDialog} aria-labelledby="error-title" aria-describedby="error-content">
        <Title id="error-title">{$_('ui.editProfil.error')}</Title>
        <Content id="error-content">
          {error}
        </Content>
        <Actions>
          <Button>
            <Label>Ok</Label>
          </Button>
        </Actions>
      </Dialog>

      <Dialog bind:this={simpleDialogSuppr} aria-labelledby="simple-title" aria-describedby="simple-content">
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <Title id="simple-title">{$_('ui.editProfil.delete')}</Title>
        <Content id="simple-content">{$_('ui.editProfil.deleteQuestion')}</Content>
        <Actions>
          <Button on:click={() => ''}>
            <Label>{$_('ui.no')}</Label>
          </Button>
          <Button on:click={() => handleDelete()}>
            <Label>{$_('ui.yes')}</Label>
          </Button>
        </Actions>
      </Dialog>
    {:else}
      <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
    {/if}
  {/await}
{/if}

<style>
  h1 {
    text-align: center;
    display: block;
    margin: 0;
    margin-bottom: 2vmin;
    font-size: 3vmin;
    margin-top: 1vmin;
    color: var(--color-brand);
  }
  form {
    transition-duration: 0.7s;
    position: absolute;
    left: 50%;
    top: 13%;
    transform: translate(-50%, 0%);
    width: 40rem;
    max-width: 90vw;
    background: white;
    border-radius: var(--rad);
    padding: 15px;
  }
  .EmptyMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: white;
  }
  .MezigField {
    margin: 10px auto;
  }
  * :global(.FullWidth) {
    width: 100%;
  }
  .validationNeeded {
    color: red;
    display: block;
    width: 100%;
    text-align: center;
  }
  .part {
    margin: 10px 0;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-labeltitle);
    border-radius: 4px;
  }
  .partTitle {
    margin: 10px 0;
    margin-left: 10px;
    font-size: 1.6vmin;
    color: var(--color-dark);
  }
  .spaceAround {
    margin: 20px;
  }
  .center {
    text-align: center;
  }
</style>
