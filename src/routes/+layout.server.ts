import { error } from '@sveltejs/kit';
import { heroItems } from '#lib/config';

// For CF Pages support
export const prerender = true;
export const csr = true;

export function load() {
	try {
		return {
			hero: Math.floor(Math.random() * heroItems.length),
			date: new Date().toLocaleString('en-US', {
				timeZone: 'US/Pacific',
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',

				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
				timeZoneName: 'short'
			})
		};
	} catch (err) {
		error(500, String(err));
	}
}
