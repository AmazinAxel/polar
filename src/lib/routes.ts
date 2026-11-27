// Every modal has a URL, so it can be shared: /contact, /projects/snowboard, ...
// Each one is prerendered with its modal already open (see [...path]/+page.ts).
import { otherShowcases } from '#lib/config';
import type { ModalName } from '#lib/shell.svelte';

type Open = { modal: ModalName; project: number };

const plain = ['launcher', 'keybinds', 'contact', 'textconverter', 'emojipicker', 'snowboard', 'borealis'] as const;

export const toPath = ({ modal, project }: Open) =>
	modal === 'project' ? `/projects/${otherShowcases[project].slug}`
	: modal ? `/${modal}` : '/';

/** The modal a path opens, or undefined when nothing lives there. */
export function fromPath(path: string): Open | undefined {
	const [first, second, ...rest] = path.split('/').filter(Boolean);
	if (rest.length) return;
	if (!first) return { modal: null, project: 0 };
	if (first === 'projects') {
		const project = otherShowcases.findIndex((p) => p.slug === second);
		return project < 0 ? undefined : { modal: 'project', project };
	}
	if (second || !(plain as readonly string[]).includes(first)) return;
	return { modal: first as ModalName, project: 0 };
}

export const modalPaths = [
	...plain.map((m) => `/${m}`),
	...otherShowcases.map((p) => `/projects/${p.slug}`)
];
