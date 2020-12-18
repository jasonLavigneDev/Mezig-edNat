<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink, navigate } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';
  import Spinner from '../components/Spinner.svelte';
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
  import Paper from '@smui/paper/bare';
  import '@smui/paper/bare.css';
  import EditTableLinks from '../components/EditTableLinks.svelte';
  // FIXME : npm add only required packages instead of whole 'svelte-material-ui'

  let loading = true;
  let whitelist = true;
  let publicName = '';
  let biography = '';
  let profilPic = '';
  let links = [];
  let skills = [];
  let newSkill = '';

  const validateForm = (publicName) => {
    return publicName !== '';
  };

  const initData = (mezig) => {
    if (mezig && mezig.links) {
      if (loading) {
        whitelist = !mezig.blacklist;
        publicName = mezig.publicName;
        biography = mezig.biography || '';
        profilPic = mezig.profilPic || '';
        links = mezig.links || [];
        skills = mezig.skills || [];
        loading = false;
      }
    }
  };

  $: user_id = useTracker(() => Meteor.userId());
  $: currentMezig = useTracker(() => Mezigs.findOne());
  $: initData($currentMezig);
  $: formValid = validateForm(publicName);

  const handleSubmit = () => {
    userData = { blacklist: !whitelist, publicName, biography, profilPic, links, skills };
    Meteor.call('mezigs.updateMezig', { mezigId: $currentMezig._id, data: userData }, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        navigate(`/profil/${$currentMezig.publicName}`, { state: `/profil/${$currentMezig.publicName}` });
      }
    });
  };

  const addSkill = () => {
    skills.push(newSkill);
    // svelte does not seem to react to push
    skills = skills;
    newSkill = '';
  };
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
    transform: translate(-50%, 0%);
    width: 30rem;
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
  .PaperTitle {
    margin: 5px;
  }
  * :global(.FullWidth) {
    width: 100%;
  }
</style>

<svelte:head>
  <title>{$_('ui.editProfil.title')} | {$_('ui.appName')}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<a href="/" use:routerLink>{$_('ui.backToHome')}</a>
{#if $user_id === null}
  <h1>{$_('api.notLoggedIn')}</h1>
{:else}
  {#await Meteor.subscribe('mezigs.self')}
    <Spinner />
  {:then}
    {#if $currentMezig}
      <form on:submit|preventDefault>
        <div class="MezigField">
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
            label={$_('ui.editProfil.publicName')} />
        </div>
        <div class="MezigField">
          <Textfield textarea fullwidth bind:value={biography} label={$_('ui.editProfil.biography')} />
        </div>
        <div>
          <span class="PaperTitle">{$_('ui.editProfil.skills')}</span>
          <Paper>
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
                disabled={newSkill === '' || skills.indexOf(newSkill) !== -1}>
                <Label>{$_('ui.editProfil.addSkills')}</Label>
              </Button>
            </FormField>
          </Paper>
        </div>
        <div>
          <span class="PaperTitle">{$_('ui.editProfil.links')}</span>
          <Paper>
            <EditTableLinks bind:links />
          </Paper>
        </div>
        <Button on:click={handleSubmit} disabled={!formValid}>{$_('ui.editProfil.submit')}</Button>
      </form>
    {:else}
      <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
    {/if}
  {/await}
{/if}
