// Borealis (NixOS config) keybinds, grouped by where they apply.
// Sources: home-manager/sway/keybinds.nix, apps/tmux.nix, apps/helix.nix, apps/yazi.nix, apps/zen.nix

export const borealis: { name: string; binds: [string, string][] }[] = [
	{
		name: 'Sway',
		binds: [
			['Super+h j k l / arrows', 'Focus window'],
			['Super+Shift+h j k l / arrows', 'Move window'],
			['Ctrl+Super+h k / l j', 'Previous / next workspace (1-9)'],
			['Ctrl+Super+Shift+h k / l j', 'Move window to previous / next workspace'],
			['Super+Scroll', 'Previous / next workspace'],
			['Ctrl+Super+Scroll', 'Move window to previous / next workspace'],
			['Super+Tab', 'Last workspace'],
			['Super+Q', 'Close window'],
			['Super+F', 'Toggle floating'],
			['F11', 'Toggle fullscreen'],
			['Super+-', 'Send window to the scratchpad'],
			['Super+=', 'Show the scratchpad'],
			['Super+Enter', 'Terminal'],
			['Super+E', 'Zen browser'],
			['Super+N', 'Yazi file manager'],
			['Super+Shift+N', 'Yazi as root'],
			['Print', 'Screenshot']
		]
	}, {
		name: 'Flurry',
		binds: [
			['Super+Space', 'Launcher'],
			['Super+X', 'Close the menu'],
			['Super+P', 'Passwords'],
			['Ctrl+Super+P', 'Save a password'],
			['Super+V', 'Clipboard history'],
			['Super+R', 'Recorder'],
			['Super+Shift+S / Power', 'Power menu'],
			['Super+I', 'Random wallpaper'],
			['Super+B', 'Switch theme'],
			['Super+O', 'Dim the screen'],
			['Super+T', 'Toggle focus mode'],
			['Super+Esc', 'Cancel the break'],
			['Super+Z', 'Toggle the status bar'],
			['Super+S', 'Toggle streaming mode'],
			['Ctrl+Super+Z', 'Toggle Bluetooth'],
			['Ctrl+Super+X', 'Toggle Wi-Fi'],
			['Ctrl+Super+C', 'Calendar'],
			['Super+C', 'Clear the oldest notification'],
			['Super+M', "Oldest notification's 1st action"],
			['Ctrl+Super+M', "Oldest notification's 2nd action"],
			['Shift+Super+M', "Oldest notification's 3rd action"],
			['Volume / brightness keys', 'Volume / brightness']
		]
	}, {
		name: 'Flurry sideview',
		binds: [
			['Ctrl+Super+Q', 'Plan'],
			['Ctrl+Super+W', 'Assistant'],
			['Ctrl+Super+E', 'Custom page'],
			['Ctrl+Super+R', 'Close the sideview'],
			['Ctrl+Super+Tab', 'Hide, or reopen the last page'],
			['Super+A', 'Toggle sideview focus'],
			['Super+G', 'Toggle sideview size']
		]
	}, {
		name: 'Flurry media',
		binds: [
			['Ctrl+Super+S', 'Play / pause (Spotify)'],
			['Ctrl+Super+A / D', 'Previous / next track (Spotify)'],
			['Super+/', 'Play / pause (MPD)'],
			['Ctrl+Super+, / .', 'Previous / next track (MPD)'],
			['Super+< / >', 'Previous / next playlist (MPD)']
		]
	}, {
		name: 'Inside flurry menus',
		binds: [
			['Clipboard: Enter', 'Select entry'],
			['Clipboard: C', 'Copy the 2nd entry'],
			['Clipboard: E', 'Edit the image in swappy'],
			['Clipboard: G', 'Open in gThumb'],
			['Clipboard: M', 'Compress the video'],
			['Clipboard: N', 'Show in Nemo'],
			['Clipboard: W', 'Wipe the clipboard'],
			['Recorder: Space', 'Record'],
			['Recorder: R', 'Toggle the mic'],
			['Recorder: Q', 'Toggle quality'],
			['Recorder: C', 'Clip the last 30s'],
			['Power menu: S', 'Sleep'],
			['Power menu: Q', 'Shut down'],
			['Power menu: L', 'Lock'],
			['Power menu: R', 'Restart']
		]
	}, {
		name: 'tmux (use alt instead of Super)',
		binds: [
			['Alt+h j k l / arrows', 'Focus pane'],
			['Alt+Shift+h j k l / arrows', 'Swap pane'],
			['Ctrl+Alt+h k / l j', 'Previous / next window (creates past the last)'],
			['Ctrl+Alt+Shift+h k / l j', 'Move pane to previous / next window'],
			['Alt+Scroll', 'Previous / next window'],
			['Ctrl+Alt+Scroll', 'Move pane to previous / next window'],
			['Alt+1-9', 'Go to window, creating it'],
			['Alt+Tab', 'Last window'],
			['Alt+Enter', 'Split along the longer side'],
			['Alt+Q', 'Close pane'],
			['Alt+F', 'Zoom pane'],
			['Alt+R, then h j k l', 'Resize pane'],
			['Alt+=', 'Scratch session popup'],
			['Alt+N', 'Yazi popup'],
			['Alt+Shift+N', 'Yazi as root popup'],
			['Alt+Space', 'Session tree'],
			['Alt+V, then v / y', 'Copy mode: select / yank']
		]
	}, {
		name: 'Helix',
		binds: [
			['Ctrl+S', 'Save'],
			['Ctrl+Q', 'Quit'],
			['Ctrl+R', 'Reload file'],
			['Ctrl+Z / Ctrl+Shift+Z', 'Undo / redo'],
			['Ctrl+C / Ctrl+V', 'Copy / paste clipboard'],
			['c', 'Toggle comments'],
			['Tab / Shift+Tab', 'Indent / unindent'],
			['Ctrl+← / →', 'Previous / next word'],
			['Alt+Tab', 'Last file'],
			['Ctrl+Tab', 'Buffer picker'],
			['Ctrl+G', 'Lazygit'],
			['Space f / F', 'File picker (cwd / root)'],
			['Space m', 'Move file'],
			['Space x', 'Delete file'],
			['Space o', 'Copy file here'],
			['Space b n / N', 'Next / previous change'],
			['Space b r', 'Reset the change'],
			['Space D', 'Diff against HEAD']
		]
	}, {
		name: 'Yazi',
		binds: [
			['C', 'Compress'],
			['M s', 'SSHFS mounts']
		]
	}
];
