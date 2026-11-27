<script lang="ts">
	import { shell, dismiss, touch } from '#lib/shell.svelte';

	const raise = (el: HTMLElement) => {
		if (!shell.notes.length) return;
		el.hidePopover();
		el.showPopover();
	};
</script>

<div class="stack" popover="manual" {@attach raise}>
	{#each shell.notes as n (n.id)}
		<div class="note">
			<button class="close" aria-label="Close notification" onclick={() => dismiss(n.id)}>×</button>
			<strong>{n.summary}</strong>
			{#if n.body}<p>{n.body}</p>{/if}
			{#if n.actions.length}
				<div class="actions">
					{#each n.actions as a}
						<button disabled={a.mobileOnly && !touch} onclick={() => { a.run(); dismiss(n.id); }}>{a.label}</button>
					{/each}
				</div>
			{/if}
			{#if n.tip}
				<hr class="tip" />
				<p class="tip" style="color: var(--light3); opacity: 0.8;">
					You can press <code>c</code> to hide this notification{#if n.actions[0]}{' '}or <code>m</code> to use the button{/if} just like in Flurry!!
				</p>
			{/if}
		</div>
	{/each}
</div>

<style>
	.stack {
		inset: 0 0 auto auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		overflow: visible;
	}

	.stack:has(.note) {
		display: flex;
		flex-direction: column-reverse;
		z-index: 10;
	}

	.close { display: none; }

	@media (pointer: coarse) and (min-width: 40rem) {
		.stack { inset: auto 0 0 auto; }
	}

	@media (pointer: coarse) and (max-width: 40rem) {
		.stack { inset: auto 0 0 0; margin: 0 auto; width: max-content; }
	}

	@media (pointer: coarse) {
		.tip { display: none; }
		.close {
			display: block;
			position: absolute;
			top: 5px;
			right: 5px;
			width: 44px;
			height: 44px;
			padding: 0;
			border: 0;
			background: none;
			color: var(--blue2);
			font-size: calc(var(--l) * 2);
			line-height: 44px;
			text-align: center;
			cursor: pointer;
		}
	}

	hr.tip { margin: 0.5rem 0; }

	.note {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 280px;
		margin: 5px 5px 0 var(--l);
		padding: calc(var(--l) - var(--s)) var(--l) var(--l);
		background: var(--dark1);
		border: var(--b) solid var(--dark4);
	}

	strong {
		display: block;
		font-size: 18px;
	}

	p { margin: 0; }

	.actions {
		display: flex;
		gap: var(--b);
		padding-top: var(--m);
	}

	.actions button {
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.actions button:disabled {
		color: inherit;
		opacity: 1;
	}
</style>
