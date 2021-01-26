<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink, navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';

  import Spinner from '../components/Spinner.svelte';
  import EditTableLinks from '../components/EditTableLinks.svelte';

  import Dialog, { Title, Content, Actions } from '@smui/dialog/bare';
  import '@smui/dialog/bare.css';
  import Chip, { Set, Icon, Text } from '@smui/chips/bare';
  import '@smui/chips/bare.css';
  import Textfield from '@smui/textfield/bare';
  import '@smui/textfield/bare.css';
  import Button, { Label } from '@smui/button/bare';
  import '@smui/button/bare.css';
  import FormField from '@smui/form-field/bare';
  import '@smui/form-field/bare.css';
  import Switch from '@smui/switch/bare';
  import '@smui/switch/bare.css';
  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'

  export let profileOk = true;
  export let simpleDialog;
  let loading = true;
  let whitelist = true;
  let publicName = '';
  let biography = '';
  let profilPic = '';
  let links = [];
  let skills = [];
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
        simpleDialog.open();
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

  const handleUpdateLinks = () => {
    // 'updateLink' event emit by EditLink component on input values in label and URL fields
    // => update links array to dynamicaly launch validateForm
    // https://svelte.dev/tutorial/updating-arrays-and-objects
    links = links;
  };

  const addSkill = () => {
    skills.push(newSkill);
    // svelte does not seem to react to push
    skills = skills;
    newSkill = '';
  };
</script>

<svelte:head>
  <title>{$_('ui.editProfil.title')} | {$_('ui.appName')}</title>
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
            <Switch bind:checked={whitelist} />
            <span slot="label">{$_('ui.editProfil.showProfile')}</span>
          </FormField>
        </div>
        <div class="MezigField">
          <Textfield
            class="FullWidth"
            variant="outlined"
            bind:value={publicName}
            label={$_('ui.editProfil.publicName')}
          />
        </div>
        <div class="MezigField">
          <Textfield class="FullWidth" variant="outlined" bind:value={email} label={$_('ui.editProfil.email')} />
        </div>
        <div class="MezigField">
          <Textfield textarea fullwidth bind:value={biography} label={$_('ui.editProfil.biography')} />
        </div>
        <div class="part">
          <p class="partTitle">{$_('ui.editProfil.skills')}</p>
          <FormField>
            <Set chips={skills} let:chip input>
              <Chip>
                <Text>{chip}</Text>
                <Icon class="material-icons" trailing tabindex="0">cancel</Icon>
              </Chip>
            </Set>
            <FormField>
              <Textfield bind:value={newSkill} label={$_('ui.editProfil.newSkill')} />
              <Button
                variant="raised"
                on:click={addSkill}
                disabled={newSkill === '' || skills.indexOf(newSkill) !== -1}
              >
                <Label>{$_('ui.editProfil.addSkills')}</Label>
              </Button>
            </FormField>
          </FormField>
        </div>
        <div class="part">
          <p class="partTitle" style="margin-bottom: 0">{$_('ui.editProfil.links')}</p>
          <EditTableLinks bind:links on:updateLink={handleUpdateLinks} />
        </div>
        <div class="center">
          <Button on:click={handleCancel} style="margin: 3%; font-size: 1.2rem;">{$_('ui.editProfil.cancel')}</Button>
          <Button on:click={handleSubmit} style="margin: 3%; font-size: 1.2rem;" disabled={!formValid} variant="raised"
            >{$_('ui.editProfil.submit')}</Button
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
    {:else}
      <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
    {/if}
  {/await}
{/if}

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
  h1 {
    text-align: center;
    display: block;
    margin: 0;
    margin-bottom: 2vmin;
    font-size: 3vmin;
    margin-top: 1vmin;
    color: white;
  }
  form {
    transition-duration: 0.7s;
    position: absolute;
    left: 50%;
    top: 13%;
    transform: translate(-50%, 0%);
    width: 40rem;
    max-width: 90vw;
    background: var(--color-light);
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
    border-color: #9e9e9e;
    border-radius: 4px;
  }
  .partTitle {
    margin: 10px 0;
    margin-left: 10px;
    font-size: 1.6vmin;
    color: #9e9e9e;
  }
  .center {
    text-align: center;
  }
</style>
