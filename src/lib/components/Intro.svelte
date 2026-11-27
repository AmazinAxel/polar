<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import { intro, otherShowcases } from '#lib/config';
	import { toPath } from '#lib/routes';
	import { openProject, toggleModal, type ModalName } from '#lib/shell.svelte';

	type Part ={ text: string; bold?: boolean; key?: boolean; href?: string };

	// The markup described above `intro` in config.ts
	function parse(s: string): Part[] {
		const parts: Part[] = [];
		let last = 0;
		for (const m of s.matchAll(/\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g)) {
			if (m.index > last) parts.push({ text: s.slice(last, m.index) });
			if (m[1]) parts.push({ text: m[1], bold: true });
			else if (m[2]) parts.push({ text: m[2], key: true });
			else parts.push({ text: m[3], href: m[4] });
			last = m.index + m[0].length;
		}
		if (last < s.length) parts.push({ text: s.slice(last) });
		return parts;
	}

	// modal:name opens that modal, or the project showcase with that slug
	function target(href: string) {
		const name = href.slice('modal:'.length);
		const project = otherShowcases.findIndex((p) => p.slug === name);
		return project < 0 ? { modal: name as Exclude<ModalName, null>, project: 0 } : { modal: 'project' as const, project };
	}
	function open(href: string) {
		const t = target(href);
		if (t.modal === 'project') openProject(t.project);
		else toggleModal(t.modal);
	}
</script>

{#snippet line(s: string)}
	{#each parse(s) as { text, bold, key, href }}
		{#if bold}<strong>{text}</strong>
		{:else if key}<kbd>{text}</kbd>
		{:else if href?.startsWith('modal:')}<a href={toPath(target(href))} onclick={(e) => { e.preventDefault(); open(href); }}>{text}</a>
		{:else if href?.startsWith('#')}<a {href}>{text}</a>
		{:else if href}<a {href} target="_blank" rel="noopener noreferrer">{text} <Icon name="external"/></a>
		{:else}{text}{/if}
	{/each}
{/snippet}

<div class="intro">
	<div class="text frost">
		<p>{@render line(intro.text)}</p>
		{#if intro.desktop}<p class="desktop">{@render line(intro.desktop)}</p>{/if}
	</div>
	{#if intro.image}<img src="/media/{intro.image}" alt="Alec">{/if}
</div>

<style>
	.intro {
		display: flex;
		gap: var(--l);
		max-width: 60rem;
		text-align: left;
	}

	.text { flex: 1; padding: var(--l); }

	p { margin: 0; }
	p + p { margin-top: var(--m); }

	/* Stretches to the text box's height (at least square), cropped to fill */
	img {
		width: 12rem;
		min-height: 0;
		contain: size; /* ignore the photo's own ratio: height comes only from the row, no layout shift */
		object-fit: cover;
		object-position: 60% 25%; /* keep head in frame when cropped wide or tall */
		outline: var(--b) solid #fff6;
		outline-offset: calc(-1 * var(--b));
	}

	kbd { padding: 0 var(--s); }

	/* The keyboard note only makes sense with a keyboard and mouse */
	@media not (pointer: fine) {
		.desktop { display: none; }
	}

	/* Phones: photo above the text */
	@media (max-width: 40rem) {
		.intro { flex-direction: column-reverse; align-items: center; }
		img { width: 10rem; min-height: 0; aspect-ratio: 1; }
	}
</style>
