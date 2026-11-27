// Snowboard's Conifer keymap (snowboard/conifer/src/keymap.h), as the keys read on the board.
// Each half: three rows of 6, then the 3 thumb keys. '' = dead key (KC_NO).
// Transparent keys (KC_TRNS) show what they fall through to on BASE.

export type Layer = { name: string; hold?: string; left: string[][]; right: string[][] };

const thumbsL = ['Space', 'SYM', 'Super'];
const thumbsR = ['Space', 'NUM', 'Alt'];

export const layers: Layer[] = [
	{
		name: 'Base',
				left: [
			['Tab', 'Q', 'W', 'E', 'R', 'T'],
			['Ctrl', 'A', 'S', 'D', 'F', 'G'],
			['Shift', 'Z', 'X', 'C', 'V', 'B'],
			thumbsL
		],
		right: [
			['Y', 'U', 'I', 'O', 'P', 'Bksp'],
			['H', 'J', 'K', 'L', ';', "'"],
			['N', 'M', ',', '.', '/', 'Enter'],
			thumbsR
		]
	}, {
		name: 'Symbols',
		hold: 'SYM',
				left: [
			['~', '!', '@', '#', '$', '%'],
			['Ctrl', 'Super', 'Alt', 'Shift', 'Ctrl', '|'],
			['Shift', '\\', ':', '<', '>', '?'],
			['Space', 'SYM', 'Esc']
		],
		right: [
			['^', '&', '*', '-', '+', 'Del'],
			['(', ')', '{', '}', '=', '`'],
			['[', ']', '_', '"', '/', 'Enter'],
			thumbsR
		]
	}, {
		name: 'Numbers',
		hold: 'NUM',
				left: [
			['Esc', 'F1', 'F2', 'F3', 'F4', 'F5'],
			['Ctrl', '←', '↓', '↑', '→', 'F11'],
			['Shift', 'F6', 'F7', 'F8', 'F9', 'F10'],
			thumbsL
		],
		right: [
			['F12', '7', '8', '9', '-', 'Bksp'],
			['*', '4', '5', '6', '=', "'"],
			['/', '1', '2', '3', '.', ''],
			['0', 'NUM', 'Alt']
		]
	}
];
