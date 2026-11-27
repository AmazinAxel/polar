<script lang="ts">
	import { notify } from '#lib/shell.svelte';
	import { allChars, searchableChars } from '#lib/emojis';
	import MoreInfo from '#lib/components/moreInfo.svelte';
	import Modal from './Modal.svelte';
	import Fuse from 'fuse.js';

	const iconList = allChars.split('').filter((v) => v != '\n');
	function copy(event: Event) {
		const char = (event.target as HTMLElement).innerText;
		navigator.clipboard.writeText(char);
		notify('Copied', char);
	};

	const formattedSearchableChars = Object.entries(searchableChars).map(([char, desc]) => ({ char, desc }));

	const fuse = new Fuse(formattedSearchableChars, {
		keys: ['desc'],
		threshold: 0.9
	});

	export function searchCharacters(query: string) {
		if (!query || query.trim() === '') return [];
		return fuse.search(query);
	};

	let query = $state('');
	let results = $derived(searchCharacters(query).map((r: any) => r.item.char).filter(Boolean));
	let showSearchResults = $derived(query.trim() !== '');

	let searchInput: HTMLInputElement;
	$effect(() => searchInput.focus());
</script>
<style>
	@font-face {
		font-family: 'Monocraft';
		src: url(/fonts/Monocraft.otf) format('opentype');
	}
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr)); gap: var(--s); max-height: 50vh; overflow-y: auto; }
	.grid button { font-family: 'Monocraft'; }
	label { display: flex; align-items: center; gap: var(--m); }
</style>

<Modal>
	{#snippet header()}MC emoji picker{/snippet}
	<label>
		Search
		<input type="text" name="search" bind:this={searchInput} bind:value={query} oninput={() => searchCharacters(query)}>
		<MoreInfo>Search feature only available for some common characters</MoreInfo>
	</label>
	<div class="grid">
		{#if showSearchResults}
			{#each results as icon}
			    <button onclick={copy}>{icon}</button>
			{/each}
		{:else}
			{#each iconList as icon}
			    <button onclick={copy}>{icon}</button>
			{/each}
		{/if}
	</div>
</Modal>
