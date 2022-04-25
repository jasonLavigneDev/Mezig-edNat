import { writable } from 'svelte/store';
import { syncable } from './localStorageStore';

export const users = writable([]);
export const searchingStore = writable('');
export const language = syncable('language', '');
