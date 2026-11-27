<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '#lib/components/Icon.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import { otherShowcases } from '#lib/config';
	import { shell } from '#lib/shell.svelte';
	import Modal from './Modal.svelte';

	const p = $derived(otherShowcases[shell.project]);
	const images = $derived(p.images?.length ? p.images : [{ src: p.image, description: '' }]);
	const paragraphs = $derived((p.body ?? p.description).split(/\n\s*\n/));

	let embla: EmblaCarouselType | undefined;

	// Any query string on the URL hides the source button. Read after mount: prerendered pages have no query
	let hasQuery = $state(false);
	onMount(() => (hasQuery = location.search !== ''));
	const source = $derived(hasQuery ? undefined : p.source);
	const links = $derived(p.links ?? []);
</script>

<!-- A shared project URL: fetch the first image with the HTML, not once the CSS and JS are in -->
<svelte:head><link rel="preload" as="image" href="/media/showcases/{images[0].src}" fetchpriority="high"></svelte:head>

<Modal width="640px">
	{#snippet top()}
		<div class="gallery">
			<div class="viewport" use:emblaCarouselSvelte={{ options: { loop: images.length > 1, watchSlides: false }, plugins: [] }}
				onemblaInit={(e: CustomEvent) => (embla = e.detail)}>
				<div class="track">
					{#each images as img, i}
						<!-- Same slide as the homepage carousel: blurred halo from --img, framed by .scene -->
						<div class="scene" style="--img: url(/media/showcases/{img.src})">
							<img src="/media/showcases/{img.src}" alt={img.description || p.title} loading={i ? 'lazy' : 'eager'}>
							{#if img.description}
								<div class="caption frost"><p>{img.description}</p></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			{#if images.length > 1}
				<button class="frost prev" onclick={() => embla?.scrollPrev()} aria-label="Previous image"><Icon name="left"/></button>
				<button class="frost next" onclick={() => embla?.scrollNext()} aria-label="Next image"><Icon name="right"/></button>
			{/if}
		</div>
	{/snippet}

	<h2>{p.title}</h2>
	<div class="text">
		{#each paragraphs as para}<p>{para}</p>{/each}
	</div>
	{#if source || links.length}
		<nav>
			{#if source}
				<a class="button source" href={source} target="_blank" rel="noopener noreferrer"><Icon name="source"/> Source <Icon name="external"/></a>
			{/if}
			{#each links as { label, url, modal, icon }}
				{#if url}
					<a class="button" href={url} target="_blank" rel="noopener noreferrer">{#if icon}<Icon name={icon}/> {/if}{label} <Icon name="external"/></a>
				{:else if modal}
					<button onclick={() => (shell.modal = modal)}>{#if icon}<Icon name={icon}/> {/if}{label}</button>
				{/if}
			{/each}
		</nav>
	{/if}
</Modal>

<style>
	.gallery {
		position: relative;
	}

	/* Same as the homepage carousel: overflow clipped only sideways, so neighbours peek in */
	.viewport {
		overflow-x: clip;
		cursor: grab;
	}

	nav a, nav button {
	  display: inline-flex;
		align-items: center;
		gap: 0.4em;
	}
	nav :global(a > svg:last-child) { width: 1rem; height: 1rem; }
	nav :global(svg) {
		width: 1.5rem;
		height: 1.5rem;
	}
	.track {
		display: flex;
		touch-action: pan-y pinch-zoom;
		padding: var(--l) 0;
	}

	/* Slide: the image block, caption panel along its bottom */
	.scene {
		flex: 0 0 70%;
		/* Margin, not the track's gap: Embla counts the last slide's margin when it loops */
		margin-right: var(--l);
		height: 20rem;
		display: flex;
		align-items: flex-end;
		padding: var(--l);
	}

	.scene img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* The image covers the scene's own outline, so draw the same border on it */
		outline: var(--b) solid #ffffff1c;
		outline-offset: calc(-1 * var(--b));
		display: block;
	}

	.caption {
		position: relative;
		width: 100%;
		padding: var(--l);
	}

	.caption p { margin: 0; }

	/* Prev/next arrows, centered on the slides' sides */
	.gallery button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.prev { left: var(--l); }
	.next { right: var(--l); }

	h2 { margin: 0; }

	.text {
		max-height: 30vh;
		overflow-y: auto;
	}

	p { margin: 0 0 var(--m); }
	p:last-child { margin: 0; }

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--b);
	}
</style>
