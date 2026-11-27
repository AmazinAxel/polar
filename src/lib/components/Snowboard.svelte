<script lang="ts">
	import { layers } from '#lib/snowboard';
	import Keys from "./Keys.svelte";
	import Modal from './Modal.svelte';
</script>

<Modal width="720px">
	{#snippet header()}Snowboard layout{/snippet}
	<div class="list">
		{#each layers as { name, hold, left, right }}
			<section>
				<h3>{name}</h3>
								<div class="board">
					{#each [left, right] as half, side}
						<div class="half">
							{#each half as row, r}
								{#each row as key, c}
									<kbd
										class:none={!key}
										class:held={hold && key === hold}
										style="grid-row: {r + 1}; grid-column: {r === 3 && side === 0 ? c + 4 : c + 1}"
									><Keys text={key}/></kbd>
								{/each}
							{/each}
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</Modal>

<style>
	.list {
		max-height: 60vh;
		overflow-y: auto;
	}

	section + section { margin-top: var(--l); }

	h3 { margin: 0; padding-bottom: 0.5rem; }
	small { font-weight: 400; color: var(--light1, inherit); }
	p { margin: var(--s) 0 var(--m); }

	.board {
		display: flex;
		justify-content: center;
		gap: calc(2 * var(--l));
	}

	.half {
		display: grid;
		grid-template-columns: repeat(6, 2.6rem);
		grid-auto-rows: 2.6rem;
		gap: var(--s);
	}

	kbd {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		overflow: hidden;
	}

	.none { opacity: 0.3; }
	.held { border-color: var(--blue3); }
</style>
