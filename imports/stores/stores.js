import { writable } from 'svelte/store';

export const ProfilName = writable(localStorage.getItem('ProfilActu'));
export const users = writable([]);
