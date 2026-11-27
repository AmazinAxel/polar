<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { shell, toggleModal, closeModal, clearOldest, invokeOldest, randomHero, notify, resetNotes } from '#lib/shell.svelte';
	import { fromPath, toPath } from '#lib/routes';
	import Launcher from './Launcher.svelte';
	import Keybinds from './Keybinds.svelte';
	import Contact from './Contact.svelte';
	import TextConverter from './TextConverter.svelte';
	import EmojiPicker from './EmojiPicker.svelte';
	import Notifications from './Notifications.svelte';
	import Project from './Project.svelte';
	import Snowboard from './Snowboard.svelte';
	import { borealis } from '#lib/borealis';

	let { hero }: { hero: number } = $props();

	// svelte-ignore state_referenced_locally
	shell.hero = hero;

	const initial = fromPath(page.url.pathname);
	Object.assign(shell, initial ?? { modal: null });

	resetNotes();
	if (!initial)
		notify("Error 404", "That resource isn't here!", [
			{ label: 'Search in Launcher', run: () => toggleModal('launcher'), mobileOnly: true }
		]);

	onMount(() => {
		if (!initial) replaceState('/', {});
	});

	$effect(() => {
		const path = toPath(shell);
		if (path !== location.pathname) replaceState(path, {});
	});

	const typing = (el: EventTarget | null) =>
		el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

	const scroll = (top: number) => window.scrollBy(0, top);

	const binds: Record<string, () => void> = {
		' ': () => toggleModal('launcher'),
		'?': () => toggleModal('keybinds'),
		j: () => scroll(100),
		k: () => scroll(-100),
		d: () => scroll(innerHeight / 2),
		u: () => scroll(-innerHeight / 2),
		g: () => window.scrollTo(0, 0),
		G: () => window.scrollTo(0, document.body.scrollHeight),
		i: randomHero,
		c: clearOldest,
		m: () => invokeOldest()
	};

	function onkeydown(e: KeyboardEvent) {
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		if (typing(e.target)) {
			// leave a text field on the page; in a modal, Esc closes the modal instead
			if (e.key === 'Escape' && !shell.modal) (e.target as HTMLElement).blur();
			return;
		}
		if (shell.modal) {
			if (e.key === 'x') closeModal();
			return;
		}
		const run = binds[e.key];
		if (!run) return;
		e.preventDefault();
		run();
	}
</script>

<svelte:window {onkeydown}/>

<Notifications/>
{#if shell.modal === 'launcher'}<Launcher/>{/if}
{#if shell.modal === 'keybinds'}<Keybinds/>{/if}
{#if shell.modal === 'contact'}<Contact/>{/if}
{#if shell.modal === 'textconverter'}<TextConverter/>{/if}
{#if shell.modal === 'emojipicker'}<EmojiPicker/>{/if}
{#if shell.modal === 'project'}<Project/>{/if}
{#if shell.modal === 'snowboard'}<Snowboard/>{/if}
{#if shell.modal === 'borealis'}<Keybinds title="Borealis keybinds" groups={borealis} width="640px"/>{/if}
