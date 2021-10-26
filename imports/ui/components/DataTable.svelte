<script>
  import { _ } from 'svelte-i18n';
  import { Meteor } from 'meteor/meteor';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import '@smui/icon-button/bare.css';
  import Mezigs from '../../api/mezigs/mezigs';
  import Spinner from '../components/Spinner.svelte';
  import Check from 'svelte-material-icons/Check.svelte';
  import Delete from 'svelte-material-icons/Delete.svelte';
  import Wrench from 'svelte-material-icons/Wrench.svelte';
  import Close from 'svelte-material-icons/Close.svelte';

  import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
  import '@smui/data-table/bare.css';
  import Select, { Option } from '@smui/select';
  import '@smui/select/bare.css';
  import IconButton from '@smui/icon-button';
  import '@smui/icon-button/bare.css';
  import Dialog, { Title, Actions, Content } from '@smui/dialog';
  import Button from '@smui/button';
  import { Label } from '@smui/common';

  let rowsPerPage = 10;
  let currentPage = 0;
  let items = [];
  let open;
  let deletingId;
  let deletingUsername;
  let sort = 'id';
  let sortDirection = 'ascending';
  let activeUsers = {};

  $: allMezigs = useTracker(() => Mezigs.findFromPublication('mezigs.all', {}).fetch());
  $: allUsers = useTracker(() => Meteor.users.find().fetch());
  $: $allUsers.forEach((user) => {
    activeUsers[user.username] = user.isActive;
  });

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, $allMezigs.length);
  // force sort function when allMezigs is updated
  $: handleSort(null, $allMezigs);
  $: slice = items.slice(start, end);
  $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

  function handleSort(sorted, data) {
    if (sorted || data) {
      // sorted is set if called by clicking a column,
      // data is set if called when allMezigs updates (then, items must be updated)
      if (data) items = data;
      items.sort((a, b) => {
        let aVal;
        let bVal;
        if (sort === 'isActive') {
          [aVal, bVal] = [activeUsers[a.username] === true, activeUsers[b.username] === true][
            sortDirection === 'ascending' ? 'slice' : 'reverse'
          ]();
        } else {
          [aVal, bVal] = [a[sort], b[sort]][sortDirection === 'ascending' ? 'slice' : 'reverse']();
        }
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal);
        }
        return aVal - bVal;
      });
      items = items;
    }
  }

  $: if (currentPage > lastPage) {
    currentPage = lastPage;
  }

  function activateProfil(username) {
    Meteor.call('users.activate', { username, active: !activeUsers[username] });
  }
  function giveAdmin(id) {}
  function deleteUser(id) {
    Meteor.call('mezigs.removeMezig', { mezigId: id });
  }
</script>

<div class="Profil">
  {#await Meteor.subscribe('mezigs.all')}
    <Spinner />
  {:then}
    {#await Meteor.subscribe('users.admin')}
      <Spinner />
    {:then}
      <DataTable
        sortable
        bind:sort
        bind:sortDirection
        on:MDCDataTable:sorted={handleSort}
        table$aria-label="Users list"
        style="width: 100%;"
      >
        <Head>
          <Row>
            <Cell columnId="username">
              <Label>{$_('ui.Admin.username')}</Label>
              <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="firstName" style="width: 100%;">
              <Label>{$_('ui.Admin.firstName')}</Label>
              <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="lastName">
              <Label>{$_('ui.Admin.lastName')}</Label>
              <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="isActive">
              <Label>{$_('ui.Admin.activated')}</Label>
              <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell sortable={false}>{$_('ui.Admin.actions')}</Cell>
          </Row>
        </Head>
        <Body>
          {#each slice as mezig}
            <Row>
              <Cell>{mezig.username}</Cell>
              <Cell>{mezig.firstName}</Cell>
              <Cell>{mezig.lastName}</Cell>
              <Cell>{activeUsers[mezig.username] === true ? $_('ui.yes') : $_('ui.no')}</Cell>
              <Cell>
                <div class="actions">
                  <div on:click={activateProfil(mezig.username)}>
                    {#if activeUsers[mezig.username] !== true}
                      <Check size={'1.6rem'} />
                    {:else}
                      <Close size={'1.6rem'} />
                    {/if}
                  </div>
                  <div on:click={giveAdmin()}>
                    <Wrench size={'1.4rem'} />
                  </div>
                  <div
                    on:click={() => {
                      open = true;
                      deletingId = mezig._id;
                      deletingUsername = mezig.username;
                    }}
                  >
                    <Delete size={'1.4rem'} />
                  </div>
                </div>
              </Cell>
            </Row>
          {/each}
        </Body>

        <Pagination>
          <div slot="rowsPerPage">
            <Label>
              {$_('ui.Admin.rowPerPage')}</Label
            >
            <Select variant="outlined" bind:value={rowsPerPage} noLabel>
              <Option value={10}>10</Option>
              <Option value={25}>25</Option>
              <Option value={100}>100</Option>
            </Select>
          </div>
          <div slot="total">
            {start + 1}-{end} of {items.length}
          </div>

          <IconButton
            class="material-icons"
            action="first-page"
            title="First page"
            on:click={() => (currentPage = 0)}
            disabled={currentPage === 0}>first_page</IconButton
          >
          <IconButton
            class="material-icons"
            action="prev-page"
            title="Prev page"
            on:click={() => currentPage--}
            disabled={currentPage === 0}>chevron_left</IconButton
          >
          <IconButton
            class="material-icons"
            action="next-page"
            title="Next page"
            on:click={() => currentPage++}
            disabled={currentPage === lastPage}>chevron_right</IconButton
          >
          <IconButton
            class="material-icons"
            action="last-page"
            title="Last page"
            on:click={() => (currentPage = lastPage)}
            disabled={currentPage === lastPage}>last_page</IconButton
          >
        </Pagination>
      </DataTable>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/await}

  <Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
    <Title id="simple-title">{$_('ui.Admin.supprAccount')}</Title>
    <Content id="simple-content">{$_('ui.Admin.supprAccount')} {deletingUsername} ?</Content>
    <Actions>
      <Button on:click={() => deleteUser(deletingId)}>
        <Label>
          {$_('ui.yes')}</Label
        >
      </Button>
      <Button>
        <Label>
          {$_('ui.no')}
        </Label>
      </Button>
    </Actions>
  </Dialog>
</div>

<style>
  .Profil {
    padding-top: 10vh;
    height: 800px;
    width: 1200px;
  }
  .actions {
    display: flex;
  }
  .actions > * {
    cursor: pointer;
  }
</style>
