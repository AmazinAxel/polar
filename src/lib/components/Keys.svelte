<script lang="ts">
	import Icon from './Icon.svelte';

	let { text }: { text: string } = $props();
	const arrows = { '←': 'left', '↑': 'up', '→': 'right', '↓': 'down' } as const;
	const label = { left: 'Left', up: 'Up', right: 'Right', down: 'Down' };
</script>

{#each text.split(/([←↑→↓])/) as part}{#if part in arrows}<Icon name={arrows[part as keyof typeof arrows]} label={label[arrows[part as keyof typeof arrows]]}/>{:else}{part}{/if}{/each}
