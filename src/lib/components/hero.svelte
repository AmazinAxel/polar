<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { heroItems } from '#lib/config';
	import { shell } from '#lib/shell.svelte';
	let { children } = $props();

	const { location, image } = $derived(heroItems[shell.hero]);
	let hovering = $state(false);
	let pinned = $state(false);
	let dismissed = $state(false);
	const shown = $derived(pinned || (hovering && !dismissed));
	function toggle() {
		if (pinned) { pinned = false; dismissed = true; }
		else pinned = true;
	}
</script>
<style>
	.scene { display: grid; place-content: center; padding-block: 0; text-align: center;
		padding: 4rem 1rem;
		grid-template-columns: min(100%, 60rem); }
	.scene > :global(*) { grid-row: 2; }
	.scene :global(h1) { margin: 0; }
	.scene.show::before, .scene.show::after { filter: none; background: var(--img) center/cover; }
	.scene.show > :global(:not(.frost)) { visibility: hidden; }
	.scene.show > .frost > :global(:first-child) { margin-right: 0.5rem; }
	.frost { --frost: #2e3440b3; text-shadow: 0 1px 2px #000a; position: absolute; left: var(--b); bottom: var(--b); border-left-width: 0; border-bottom-width: 0; padding: var(--s) var(--m); font-size: 0.8rem; cursor: default; text-align: center; max-width: calc(100% - 2 * var(--b)); }
</style>

<svelte:head><link rel="preload" as="image" href="/media/herobanners/{image}" fetchpriority="high"></svelte:head>

<div class="scene" class:show={shown} style="--img: url(/media/herobanners/{image})">
	{@render children?.()}
	<span class="frost" role="note" onpointerenter={(e) => e.pointerType === 'mouse' && (hovering = true)} onpointerleave={(e) => e.pointerType === 'mouse' && (hovering = false, dismissed = false)} onclick={toggle} onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()} tabindex="0"><Icon name="location"/>{#if shown} {location}{/if}</span>
</div>
