<script>
  import { _ } from 'svelte-i18n';
  import Bowser from 'bowser';
  import PackageJSON from '../../../package.json';
  import Modal from '../components/Modal.svelte';

  let version = PackageJSON.version;
  const bowser = Bowser.parse(window.navigator.userAgent);
  const { browser, os, platform } = bowser;

  let showModal = false;
</script>

<svelte:head>
  <title>{$_('ui.about')}</title>
</svelte:head>

<div class="containerPaper">
  <div class="imgContainer">
    <img class="imageSize" src="/favicon.ico" alt="puce eole" />
  </div>
  <div class="textZone">
    <h1 class="title is-1">
      <i class="titleH1" style="color: #372F84">Mezig - version {version}</i>
    </h1>
    <p>
      {$_('ui.AboutPage.developped')}{' '}
      <a title="EUPL 1.2" target="_blank" rel="noreferrer noopener" href="https://eupl.eu/1.2/fr/"> EUPL 1.2 </a>{' '}
      {$_('ui.AboutPage.socle')}{' '}
      <a title="EOLE 3" target="_blank" rel="noreferrer noopener" href="https://pcll.ac-dijon.fr/eole/eole-3/">
        EOLE³
      </a>
    </p>
    <p>
      {$_('ui.AboutPage.by')}{' '}
      <a title="PCLL" target="_blank" rel="noreferrer noopener" href="https://pcll.ac-dijon.fr/pcll/">
        Pôle de Compétences Logiciels Libres
      </a>{' '}
      {$_('ui.AboutPage.and')}{' '}
      <a title="MENJ" target="_blank" rel="noreferrer noopener" href="https://www.education.gouv.fr/">
        Ministère de l&apos;Éducation Nationale et de la Jeunesse
      </a>{' '}
      {$_('ui.AboutPage.contributions')}{' '}
      <a title="DINUM" target="_blank" rel="noreferrer noopener" href="https://www.numerique.gouv.fr/dinum/">
        Direction Interministérielle du Numérique
      </a>{' '}
      {$_('ui.AboutPage.external')}
    </p>
    <p>
      {$_('ui.AboutPage.links')}{' '}
      <a title="wiki eole" target="_blank" rel="noreferrer noopener" href="https://wiki.eole.education/">
        documentation de l'application.
      </a>
    </p>
    <p>
      {$_('ui.AboutPage.exchange')}{' '}
      <a title={$_('ui.AboutPage.chat')} target="_blank" rel="noreferrer noopener" href="https://chat.mim-libre.fr">
        {$_('ui.AboutPage.chat')}.
      </a>
    </p>
    <p>
      {$_('ui.AboutPage.news')}{' '}
      <a title="Mastodon" target="_blank" rel="noreferrer noopenner" href="https://mastodon.eole.education/@EOLE">
        Mastodon.
      </a>
    </p>
    <p>
      {$_('ui.AboutPage.contributing')}{' '}
      <a
        title={$_('ui.AboutPage.deposit')}
        target="_blank"
        rel="noreferrer noopenner"
        href="https://gitlab.mim-libre.fr/alphabet/mezig"
      >
        {$_('ui.AboutPage.deposit')}.
      </a>
    </p>
    <br />
    <button class="buttonInfos" on:click={() => (showModal = true)}>
      {$_('ui.AboutPage.information')}
    </button>
  </div>
</div>

<Modal {browser} {os} {platform} bind:showModal>
  <p>
    {$_('ui.AboutPage.Modal.navigator')}
    {JSON.stringify(browser.name)}
  </p>
  <p>
    {$_('ui.AboutPage.Modal.version')}
    {JSON.stringify(browser.version)}
  </p>
  <p>
    {$_('ui.AboutPage.Modal.os')}
    {JSON.stringify(os.name)}
  </p>
  <p>
    {$_('ui.AboutPage.Modal.device')}
    {JSON.stringify(platform.type)}
  </p>
</Modal>

<style>
  .imageSize {
    height: 10vw;
    place-content: center;
  }
  .containerPaper {
    display: flex;
    flex-direction: row;
    width: fit-content;
    margin: 5vw auto;
    height: 50vh;
    padding: 10;
    place-items: center;
    background-color: #fff;
    color: #040d3e;
    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 8px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }
  .imgContainer {
    display: flex;
    width: 25%;
    justify-content: center;
  }
  .textZone {
    width: 50vw;
  }
  .buttonInfos {
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 8px;
    color: #fff;
    background-color: #011caa;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .containerPaper {
      padding: 6px 0px;
      overflow: auto;
      flex-direction: column;
      margin: 1vw auto;
    }

    .buttonInfos {
      margin-bottom: 5vh;
    }

    .textZone {
      width: 90%;
    }
  }
</style>
