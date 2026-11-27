<script lang="ts">
	import { keybinds } from '#lib/shell.svelte';
	import Keys from "./Keys.svelte";
	import Modal from './Modal.svelte';

	type Group = { name?: string; binds: [string, string][] };
	let { title = 'Keybinds', groups = [{ binds: keybinds }], width }: { title?: string; groups?: Group[]; width?: string } = $props();
</script>

<Modal {width}>
	{#snippet header()}{title}{/snippet}
	<div class="list">
		{#each groups as { name, binds }}
			{#if name}<h3>{name}</h3>{/if}
			<dl>
				{#each binds as [keys, action]}
					<dt><kbd><Keys text={keys}/></kbd></dt>
					<dd>{action}</dd>
				{/each}
			</dl>
		{/each}
	</div>
</Modal>

<style>
	.list {
		max-height: 50vh;
		overflow-y: auto;
	}

	h3 { margin: var(--l) 0 var(--s); }
	h3:first-child { margin-top: 0; }

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--s) var(--l);
		margin: 0;
	}

	dd { margin: 0; }

	kbd {
		display: inline-block;
		padding: 0 var(--m);
		white-space: nowrap;
	}

</style>
