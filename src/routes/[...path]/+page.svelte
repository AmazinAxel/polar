<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Hero from '#lib/components/hero.svelte';
	import Intro from '#lib/components/Intro.svelte';
	import Subtext from '#lib/components/subtext.svelte';
	import { otherShowcases, minecraftServers } from '#lib/config';
	import { toggleModal, openProject, copyIp } from '#lib/shell.svelte';

	let showAllProjects = $state(false);
</script>

<style>
	.scene { display: flex; flex-direction: column; align-items: flex-start; }
	.scene.right { align-items: flex-end; text-align: right; }
	.scene h1 { font-size: 3rem; margin: 0; padding: 0; }
	.scene h2 { font-size: 1rem; font-weight: 400; margin: 0 0 var(--l); padding: 0.35rem 0.1rem; }
	.group { display: flex; flex-direction: column; gap: calc(var(--l) / 2); margin-top: calc(-1 * var(--b)); padding: var(--l); outline: var(--b) solid #ffffff1c; outline-offset: calc(-1 * var(--b)); }
	.group > .scene { align-self: stretch; }
	.actions { display: flex; flex-wrap: wrap; gap: var(--b); }
	.showcases, .rest { display: flex; flex-direction: column; gap: var(--b); }
	.showcases > *, .rest > * { box-sizing: border-box; flex: 0 0 auto; min-width: 0; }
	.showcases .scene { position: relative; height: 10rem; padding: var(--l); justify-content: flex-end; cursor: pointer; }
	.ring { position: absolute; inset: 0; z-index: 2; pointer-events: none; box-shadow: inset 0 0 0 var(--b) #ffffff1c; }
	.showcases .scene:hover, .showcases .scene:focus-visible { z-index: 3; }
	.showcases .scene:hover .ring, .showcases .scene:focus-visible .ring { outline: var(--b) solid var(--blue2); outline-offset: 0; }
	.showcases .caption { width: 100%; padding: var(--m); }
	.showcases h3 { margin: 0 0 var(--s); }
	.showcases p { margin: 0; }
	.rest { flex: 0 0 100%; position: relative; }
	.rest.collapsed { height: 10rem; overflow: hidden; }
	.fade { align-items: center; }
	.fade button { cursor: pointer; }
	.footer { display: flex; justify-content: space-between; align-items: center; }
	h2 { margin: 0; padding: 2rem 0 1rem; }
</style>

{#snippet showcase({ title, description, image }: { title: string; description: string; image: string }, i: number)}
	<div class="scene" style="--img: url(/media/showcases/{image})" role="button" tabindex="0"
		onclick={() => openProject(i)} onkeydown={(e) => e.key === 'Enter' && openProject(i)}>
		<span class="ring"></span>
			<div class="caption frost">
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	</div>
{/snippet}

<svelte:head><title>Home</title></svelte:head>
<Hero>
	<Intro/>
</Hero>

<h2 id="mc">Minecraft server projects</h2>

<div class="scene head" style="--img: url(/media/showcases/playboard.png)">
	<h1>Playboard</h1>
	<h2>A platform & community for creators</h2>
	<a class="button frost" href="https://discord.playboardmc.com" target="_blank" rel="noopener noreferrer">Join our Discord server! <Icon name="external"/></a>
</div>
<div class="group">
	{#each minecraftServers as { title, image, description, align, ips, links }}
		<div class="scene" class:right={align == 'right'} style="--img: url(/media/showcases/{image})">
			<h1>{title}</h1>
			<h2>{description}</h2>
			<div class="actions">
				{#each ips as ip}
					<button class="frost" onclick={() => copyIp(ip)}>{ip}</button>
				{/each}
				{#each links as { href, label }}
					<a class="button frost" {href} target="_blank" rel="noopener noreferrer">{label} <Icon name="external"/></a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<h2 id="projects">My other projects</h2>
<div class="showcases">
	{#each otherShowcases.slice(0, 4) as p, i}
		{@render showcase(p, i)}
	{/each}
	<div class="rest" class:collapsed={!showAllProjects}>
		{#each otherShowcases.slice(4) as p, i}
			{@render showcase(p, i + 4)}
		{/each}
		{#if !showAllProjects}
			<div class="fade">
				<button class="button frost" onclick={() => (showAllProjects = true)}>Click to see rest of projects</button>
			</div>
		{/if}
	</div>
</div>

<hr>
<div class="footer"><a class="button frost" href="https://journal.amazinaxel.com" target="_blank" rel="noopener noreferrer">My Journal <Icon name="external"/></a><button class="contact" onclick={() => toggleModal('contact')}>Contact me</button></div>
