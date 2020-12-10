<script>
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { link as routerLink } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
  import Mezigs from '../../api/mezigs/mezigs';
  import Spinner from '../components/Spinner.svelte';

  const defaultLink = { label: '', URL: '', isSocialNetwork: false, isPublic: true };
  let loading = true;
  let whitelist = true;
  let publicName = '';
  let biography = '';
  let profilPic = '';
  let links = [];
  let skills = [];
  let newLink = defaultLink;
  let newSkill = '';

  const validateForm = (publicName) => {
    return publicName !== '';
  };

  const initData = (mezig) => {
    console.log('Init Data ', mezig);
    if (mezig && mezig.links) {
      if (loading) {
        whitelist = !mezig.blacklist;
        publicName = mezig.publicName;
        biography = mezig.biography;
        profilPic = mezig.profilPic;
        links = mezig.links;
        skills = mezig.skills;
        loading = false;
      } else {
        // fixme : ask user if he wants to reload form ?
        alert('warning, mezig has changed while editing !!');
      }
    }
  };

  $: user_id = useTracker(() => Meteor.userId());
  $: currentMezig = useTracker(() => Mezigs.findOne(user_id));
  $: initData($currentMezig);
  $: formValid = validateForm(publicName);

  const handleSubmit = () => {
    userData = { blacklist: !whitelist, publicName, biography, profilPic, links, skills };
    console.log('Submit, data : ', userData);
    // set loading to true to permit reload from api
    loading = true;
  };
  const addLink = () => {
    console.log('Add link');
    links.push(newLink);
    newLink = defaultLink;
  };
  const addSkill = () => {
    console.log('Add skill');
    skills.push(newSkill);
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    max-width: 90vw;
    background: var(--color-brand);
    border-radius: var(--rad);
    padding: 15px;
  }
  input[type='text'],
  textarea {
    font-family: var(--font-fam);
    width: 100%;
    border: 0;
    font-size: 1rem;
    color: var(--color-dark);
    background: var(--color-light);
    border-radius: var(--rad);
  }
  input[type='text'] {
    height: var(--height);
  }
  .form-field {
    margin: 10px auto;
  }

  label {
    margin-bottom: 5px;
  }
  .EmptyMsg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: white;
  }
</style>

<svelte:head>
  <title>{$_('ui.editProfil.title')} | {$_('ui.appName')}</title>
</svelte:head>

<a href="/" use:routerLink>{$_('ui.backToHome')}</a>
{#if $user_id === null}
  <h1>{$_('api.notLoggedIn')}</h1>
{:else}
  {#await Meteor.subscribe('mezigs.self')}
    <Spinner />
  {:then}
    {#if $currentMezig}
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-field">
          <label> <input type="checkbox" id="whitelist" bind:checked={whitelist} /> Publier mon profil </label>
        </div>
        <div class="form-field">
          <label for="publicName">Nom Publique</label>
          <input type="text" id="publicName" bind:value={publicName} />
        </div>
        <div class="form-field">
          <label for="biography">Biographie</label>
          <textarea id="biography" rows="4" bind:value={biography} />
        </div>
        <button disabled={!formValid}>Valider</button>
      </form>
    {:else}
      <div class="EmptyMsg">{$_('ui.unknownUser')}</div>
    {/if}
  {/await}
{/if}
