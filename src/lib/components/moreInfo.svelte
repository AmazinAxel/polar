<script lang="ts">
	let { children }: { children: () => any } = $props();
	let show = $state(false);
</script>
<style>
	span { position: relative; cursor: help; color: var(--blue2); }
	.card { position: absolute; z-index: 3; top: 1.5rem; left: 0; width: max-content; max-width: 18rem; margin: 0; padding: var(--m); }
</style>

<span role="note" onmouseenter={() => show = true} onmouseleave={() => show = false}>
	ⓘ{#if show}<span class="card frost">{@render children?.()}</span>{/if}
</span>
