import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			// index.html is also the fallback for unknown paths, so /a/b must not resolve ./_app to /a/_app
			paths: { relative: false }
		})
	],
	build: {
		rolldownOptions: {
			checks: { pluginTimings: false }
		}
	}
});
