<script lang="ts">
	import Fuse from 'fuse.js';
	import { browser } from '$app/environment';
	import { otherShowcases, minecraftServers, launcherDefaults } from '#lib/config';
	import { closeModal, toggleModal, openProject, randomHero, copyIp } from '#lib/shell.svelte';
	import Modal from './Modal.svelte';

	type Item = { name: string; extra?: string; run: (newTab: boolean) => void };

	const open = (url: string) => () => window.open(url, '_blank', 'noopener');

	const onPage = (): Item[] => !browser ? [] : [
		...[...document.querySelectorAll<HTMLElement>('#content h2')].map((h) => ({
			name: 'Go to ' + h.textContent!.trim(),
			run: () => h.scrollIntoView()
		})),
		...[...document.querySelectorAll<HTMLElement>('#content a[href], #content button')].map((el) => ({
			name: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim(),
			run: (newTab: boolean) => (newTab && el instanceof HTMLAnchorElement ? open(el.href)() : el.click())
		}))
	];

	const items: Item[] = $derived([
		{ name: 'Top of the page', run: () => window.scrollTo(0, 0) },
		{ name: 'Contact', run: () => toggleModal('contact') },
		{ name: 'MC small text converter', run: () => toggleModal('textconverter') },
		{ name: 'MC emoji picker', run: () => toggleModal('emojipicker') },
		{ name: 'Journal', run: open('https://journal.amazinaxel.com') },
		{ name: 'Site source', run: open('https://github.com/AmazinAxel/site') },
		...otherShowcases.map((p, i) => ({ name: p.title, run: () => openProject(i) })),
		...minecraftServers.flatMap((s) => [
			...s.ips.map((ip) => ({ name: `${s.title}: copy ${ip}`, run: () => copyIp(ip) })),
			...s.links.map((l) => ({ name: `${s.title}: ${l.label}`, run: open(l.href) }))
		]),
		{ name: 'Random wallpaper', run: randomHero },
		{ name: 'Keybinds', run: () => toggleModal('keybinds') },
		{ name: 'Borealis keybinds', run: () => toggleModal('borealis') },
		{ name: 'Snowboard', run: () => toggleModal('snowboard') },
		...onPage()
	].filter((i) => i.name));

	const fuse = $derived(new Fuse(items, { keys: ['name', { name: 'extra', weight: 0.3 }], threshold: 0.4 }));

	let query = $state('');
	let selected = $state(0);

	const results = $derived(
		query.length >= 2
			? fuse.search(query, { limit: 5 }).map((r) => r.item)
			: launcherDefaults.map((n) => items.find((i) => i.name === n)).filter((i): i is Item => !!i)
	);

	function activate(item: Item | undefined, newTab: boolean) {
		if (!item) return;
		closeModal();
		item.run(newTab);
	}

	function onkeydown(e: KeyboardEvent) {
		const step =
			e.key === 'ArrowDown' || (e.ctrlKey && e.key === 'j') ? 1 :
			e.key === 'ArrowUp' || (e.ctrlKey && e.key === 'k') ? -1 : 0;
		if (step) {
			e.preventDefault();
			if (results.length) selected = (selected + step + results.length) % results.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			activate(results[selected], e.shiftKey);
		}
	}
</script>

<Modal>
	{#snippet header()}
		<!-- svelte-ignore a11y_autofocus -->
		<input bind:value={query} oninput={() => (selected = 0)} {onkeydown} autofocus spellcheck="false" aria-label="Search"/>
	{/snippet}
	{#if results.length}
		<div class="rows">
			{#each results as item, i}
				<button class:selected={i === selected} onclick={() => activate(item, false)}>{item.name}</button>
			{/each}
		</div>
	{/if}
</Modal>

<style>
	input {
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: inherit;
		outline: none;
	}

	.rows {
		display: flex;
		flex-direction: column;
		gap: var(--b);
	}

	button {
		min-height: calc(32px + 2 * var(--m) + 2 * var(--b));
		text-align: left;
		color: var(--light3);
		font-weight: 700;
	}

	.selected {
		outline: var(--b) solid var(--blue2);
		outline-offset: 0;
	}
</style>
