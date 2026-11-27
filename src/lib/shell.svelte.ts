import { heroItems } from '#lib/config';

export type ModalName = 'launcher' | 'keybinds' | 'contact' | 'textconverter' | 'emojipicker' | 'project' | 'snowboard' | 'borealis' | null;
export type Action = { label: string; run: () => void; mobileOnly?: boolean };
export type Note = { id: number; summary: string; body?: string; actions: Action[]; tip?: boolean };

export const shell = $state({
	modal: null as ModalName,
	notes: [] as Note[],
	hero: 0,
	project: 0
});

export const toggleModal = (m: Exclude<ModalName, null>) => (shell.modal = shell.modal === m ? null : m);
export const closeModal = () => (shell.modal = null);
export const openProject = (i: number) => ((shell.project = i), (shell.modal = 'project'));

export const keybinds: [string, string][] = [
	['Space', 'Launcher'],
	['?', 'This cheat sheet'],
	['j / k', 'Scroll down / up'],
	['d / u', 'Scroll half a page down / up'],
	['g / G', 'Top / bottom of the page'],
	['i', 'Random wallpaper'],
	['c', 'Clear oldest notification'],
	['m', "Use oldest notification's action"],
	['x / Esc', 'Close the modal'],
	['↑ ↓ / Ctrl+j k', 'Launcher: move the selection'],
	['Enter / Shift+Enter', 'Launcher: open / open in a new tab']
];

export function randomHero() {
	let i = shell.hero;
	while (i === shell.hero) i = Math.floor(Math.random() * heroItems.length);
	shell.hero = i;
}

export const touch = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;

let nextId = 0;
let tipShown = false;

export function resetNotes() {
	shell.notes = [];
	nextId = 0;
	tipShown = false;
}

export function notify(summary: string, body?: string, actions: Action[] = []) {
	const tip = !tipShown;
	tipShown = true;
	if (shell.notes.length >= 3) shell.notes.shift();
	shell.notes.push({ id: nextId++, summary, body, actions, tip });
}

export function copyIp(ip: string) {
	navigator.clipboard.writeText(ip);
	notify('IP copied', "Paste it in your Minecraft multiplayer menu!");
}

export const dismiss = (id: number) => (shell.notes = shell.notes.filter((n) => n.id !== id));

export function clearOldest() {
	if (shell.notes[0]) dismiss(shell.notes[0].id);
}

export function invokeOldest() {
	const n = shell.notes[0];
	if (!n?.actions[0]) return;
	n.actions[0].run();
	dismiss(n.id);
}
