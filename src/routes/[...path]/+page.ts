import { modalPaths } from '#lib/routes';

// One page per modal URL, each with its modal in the HTML. Anything else gets 404.html
// (Cloudflare Pages serves it for unknown paths), which ships with the 404 notification.
export const entries = () => ['', '404', ...modalPaths.map((p) => p.slice(1))].map((path) => ({ path }));
