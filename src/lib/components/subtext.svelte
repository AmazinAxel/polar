<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';

	let { header, url }: { header: string; url?: string } = $props();
</script>

<h2>
	{#if url}<a href={url} target="_blank" rel="noopener noreferrer">{header} <Icon name="external"/></a>{:else}{header}{/if}
</h2>
