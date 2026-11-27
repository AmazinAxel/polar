<script lang="ts">
	// flurry's centered card (lib/backgroundSection.rs): a wallpaper header over the content.
	// A native modal dialog: it takes focus, keeps it inside, dims and disables the page behind.
	import type { Snippet } from 'svelte';
	import { heroItems } from '#lib/config';
	import { shell, closeModal } from '#lib/shell.svelte';

	// top replaces the wallpaper header (e.g. a gallery); width widens the card for big content
	let { header, top, children, width = '500px' }: { header?: Snippet; top?: Snippet; children?: Snippet; width?: string } = $props();
	const image = $derived(heroItems[shell.hero].image);

	// Rendered open so a prerendered modal URL paints with it before any JS; then made modal
	const open = (dialog: HTMLDialogElement) => {
		if (dialog.open) dialog.close();
		dialog.showModal();
	};
</script>

<!-- Esc (cancel) and clicks on the dimmed backdrop (the dialog itself, outside .body) close it -->
<dialog
	open
	{@attach open}
	oncancel={(e) => { e.preventDefault(); closeModal(); }}
	onclick={(e) => e.target === e.currentTarget && closeModal()}
	style="width: min({width}, calc(100vw - 2 * var(--l)))"
>
	<div class="body">
		{#if top}
			{@render top()}
		{:else if header}
			<div class="scene" style="--img: url(/media/herobanners/{image})">
				{@render header()}
			</div>
		{/if}
		{@render children?.()}
	</div>
</dialog>

<style>
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--m);
		padding: var(--l);
	}

	/* The header row: Sora 700 in light3 */
	.scene {
		padding: 48px var(--m) 48px var(--l);
		font-size: 24px;
		font-weight: 700;
		color: var(--light3);
	}
</style>
