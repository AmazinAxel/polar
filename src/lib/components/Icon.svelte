<script lang="ts">
	type Name = 'external' | 'source' |'location' | 'clock' | 'calendar' | 'keyboard' | 'left' | 'right' | 'up' | 'down';
	let { name, label }: { name: Name; label?: string } = $props();
	// flurry-style icons (flurry ui/ICONS.md: 16 grid, 2 thick, 45deg only), same as static/media/icons
	const d: Record<Name, string> = {
		external: 'M5 1H15V11H13V4.4142L2.4142 15L1 13.5858L11.5858 3H5Z',
		location: 'M6.3431 1H9.6569L12 3.3431V7L8 11L4 7V3.3431Z M7.1716 3H8.8284L10 4.1716V5.8284L8.8284 7H7.1716L6 5.8284V4.1716Z M4 13H12V15H4Z',
		clock: 'M5.1005 1H10.8995L15 5.1005V10.8995L10.8995 15H5.1005L1 10.8995V5.1005Z M5.9289 3H10.0711L13 5.9289V10.0711L10.0711 13H5.9289L3 10.0711V5.9289Z M7 5H9V7H11V9H7Z',
		keyboard: 'M1 3H15V13H1Z M3 5H5V7H3Z M7 5H9V7H7Z M11 5H13V7H11Z M5 9H11V11H5Z',
		source: 'M8 1L15 8L8 15L1 8L5.1716 3.8284L7 5.6569V11H9V7.6569L10.7574 9.4142L12.1716 8L6.5858 2.4142Z',
		calendar: 'M4 1H6V3H10V1H12V3H15V15H1V3H4Z M3 7H13V13H3Z M7 9H9V11H7Z',
		right: 'M8 1L15 8L8 15L6.5858 13.5858L11.1716 9H1V7H11.1716L6.5858 2.4142Z',
		left: 'M9.4142 2.4142L4.8284 7H15V9H4.8284L9.4142 13.5858L8 15L1 8L8 1Z',
		up: 'M8 1L15 8L13.5858 9.4142L9 4.8284V15H7V4.8284L2.4142 9.4142L1 8Z',
		down: 'M8 15L1 8L2.4142 6.5858L7 11.1716V1H9V11.1716L13.5858 6.5858L15 8Z',
	};
</script>
<style>
	svg { width: 1em; height: 1em; vertical-align: -0.125em; filter: drop-shadow(0 0 8px color-mix(in srgb, currentColor 60%, transparent)); }
</style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
	<path fill-rule="evenodd" d={d[name]}/>
</svg>
