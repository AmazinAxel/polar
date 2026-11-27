import type { ModalName } from '#lib/shell.svelte';
export type Link = { label: string; url?: string; modal?: Exclude<ModalName, null>; icon?: 'keyboard' | 'source' };
export type ShowcaseImage = { src: string; description: string };

export type Showcase = {
	title: string;
	slug: string;
	image: string;
	description: string;
	body?: string;
	images?: ShowcaseImage[];
	source?: string;
	links?: Link[];
};

export const launcherDefaults: string[] = [
	'Keybinds',
	'Borealis keybinds',
	'Journal',
	'MC small text converter',
	'MC emoji picker'
];

export const intro = {
	image: 'me.avif',
	text: "**Hi! I'm Alec!** You may know me from some [MC projects](#mc) or from one of my [other projects](#projects). You can find me [journaling](https://journal.amazinaxel.com) and I'm always [happy to talk](modal:contact)!!",
	desktop: 'Also: this site is modal & keyboard-navigable - you can press `space` to open a launcher inspired by my [Flurry](modal:flake) design language!'
};

export const otherShowcases: Showcase[] = [
	{
		title: 'Wintergreen',
		slug: 'wintergreen',
		image: 'wintergreen/wintergreen.avif',
		description: 'A precached and hyperfocused reading firmware with Bluetooth page turner support & compiled book sync for the Xteink X4 ereader',
		images: [
			{ src: 'wintergreen/wintergreen.avif', description: '' },
			{ src: 'wintergreen/wintergreen-art.png', description: 'Art drawn by hand!' },
			{ src: 'wintergreen/wintergreen-pageturner.jpeg', description: 'Pairs nicely with a Bluetooth page turner!' }
		],
		source: 'https://github.com/AmazinAxel/wintergreen'
	}, {
		title: 'Snowboard + Conifer',
		slug: 'snowboard',
		image: 'snowboard/snowboard.avif',
		description: 'Ortholinear, columnarstaggered Corne-like low-profile embedded CH32X035 wired split keyboard with a custom firmware!',
		images: [
			{ src: 'snowboard/snowboard.avif', description: '' },
			{ src: 'snowboard/schematic.png', description: 'PCB schematic' },
			{ src: 'snowboard/full-pcb.png', description: 'PCB tracing' },
			{ src: 'snowboard/MCU.png', description: 'MCU tracing' },
			{ src: 'snowboard/snowboard-pcb.png', description: 'PCB' },
			{ src: 'snowboard/snowboard-5.webp', description: 'Top-down CAD view' },
			{ src: 'snowboard/snowboard-6.webp', description: 'Side CAD view' },
			{ src: 'snowboard/pcb-assemble.jpg', description: 'All the parts' },
			{ src: 'snowboard/snowboard-dev.jpg', description: 'Wiring and debugging the MCU' },
			{ src: 'snowboard/building.jpg', description: 'Connecting it together' },
			{ src: 'snowboard/snowboard-top.webp', description: 'Top-down' },
			{ src: 'snowboard/snowboard-layered.jpg', description: 'Both halfs stacked!' }
		],
		source: 'https://github.com/amazinaxel/snowboard',
		links: [
			{ label: 'Layout', modal: 'snowboard', icon: 'keyboard' }
		]
	}, {
		title: 'Flurry + Borealis',
		slug: 'borealis',
		image: 'flake.avif',
		description: 'A highly keyboard-optimized, opinionated NixOS desktop configuration for productive daily use',
		images: [
			{ src: 'flurry/flake.avif', description: '' },
			{ src: 'flurry/my-devices.jpg', description: 'All my devices run Borealis!' },
			{ src: 'flurry/chat.png', description: 'An actually productive assistant' },
		],
		links: [
			{ label: 'Borealis source', url: 'https://github.com/AmazinAxel/borealis', icon: 'source' },
			{ label: 'Flurry source', url: 'https://github.com/AmazinAxel/flirry', icon: 'source' },
			{ label: 'Keybinds', modal: 'borealis', icon: 'keyboard' }
		]
	// }, {
		// title: 'Firewatch',
		// image: 'firewatch.avif',
		// slug: 'firewatch',
		// source: 'https://github.com/AmazinAxel/firewatch',
		// description: 'Custom ESP32-powered SDS011 wildfire smoke sensor hooked up to a solar cell battery pack that displays its AQI health readings on a TRMNL display'
	}, {
		title: 'Snowpane',
		image: 'snowpane/homelab.png',
		slug: 'snowpane',
		source: 'https://github.com/AmazinAxel/snowpane',
		description: 'Ultra low power home server controller orchestrating my programs, backups, services and automations',
		images: [
			{ src: 'snowpane/homelab.png', description: 'My homelab!' },
			{ src: 'snowpane/homelab-front.png', description: 'Only what I need to see' },
			{ src: 'snowpane/homelab-logs.png', description: '...including task logs!' },
			{ src: 'snowpane/homelab-shutdown.png', description: 'It\'s more useful than you\'d think!' },
			{ src: 'snowpane/sds.png', description: 'The hub for my ESP32 IoT devices' }
		]
	// }, {
	// 	title: 'Bark',
	// 	image: 'bark.avif',
	// 	slug: 'bark',
	// 	source: 'https://github.com/AmazinAxel/bark',
	// 	description: 'Modified Blot firmware + hardware intended for automated precise, high speed poster & stickersheet handwriting/printing'
	// }, {
	// 	title: 'Aurora',
	// 	image: 'aurora.avif',
	// 	slug: 'aurora',
	// 	source: 'https://github.com/AmazinAxel/aurora',
	// 	description: 'Lightweight, highly legible Watchy firmware integrating a Pomodoro focus timer'
	// }, {
	// 	title: 'Anbernix',
	// 	image: 'anbernix.avif',
	// 	slug: 'anbernix',
	// 	source: 'https://github.com/AmazinAxel/anbernix',
		// description: 'NixOS hardware support flake for Anbernic handhelds'
	}
];

export const minecraftServers = [
	{
		title: 'Nocturn',
		image: 'nocturn.avif',
		description: 'Murder mystery with a ton of roles',
		align: 'left',
		ips: ['nocturn.minekeep.gg'],
		links: [{ href: 'https://discord.nocturnmc.net', label: 'Discord' }]
	}, {
		title: 'Permafrost',
		image: 'permafrost.avif',
		description: 'Hardcore survival in a snowy tundra',
		align: 'right',
		ips: [],
		links: [{ href: 'https://permafrostmc.com', label: 'In closed alpha' }]
	}
];

export const heroItems = [
	{
		location: 'Mt. Baker • Washington State',
		image: 'baker.avif'
	}, {
		location: 'San Juan Islands • Washington State',
		image: 'san-juan-islands.avif'
	}, {
		location: 'North Cascades National Park • Washington State',
		image: 'north-cascades.avif'
	}, {
		location: 'First Hill • Seattle, WA',
		image: 'seattle-first-hill.avif'
	}, {
		location: 'Concrete • Washington State',
		image: 'concrete.avif'
	}, {
		location: 'La Jolla • California',
		image: 'la-jolla.avif'
	}, {
		location: 'Ross Lake • North Cascades National Park',
		image: 'ross-lake.avif'
	}, {
		location: 'San Diego I-8 (south) • California',
		image: 'san-diego-i8-south.avif'
	}, {
		location: 'Wenatchee River • Washington State',
		image: 'wenatchee-river.avif'
	}, {
		location: 'Shaw Island • Washington State',
		image: 'shaw-island-trees.avif'
	}
];
