<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import MoreInfo from '#lib/components/moreInfo.svelte';
	import Modal from './Modal.svelte';

	var inputText = $state('');
	var outputText = $state('');
	let textType = $state(false);
	let scriptType = $state(2);
	let autoCopy = $state(true);

	const normalAlphabet = 'abcdefghijklmnopqrstuvwxyz*';
	const smallTextChars = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴoᴘǫʀsᴛᴜᴠᴡxʏᴢ⋆';
	const altTextChars = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴoᴘꞯʀsᴛᴜᴠᴡxʏᴢ⋆';

	const scriptChars = '0123456789+-=()';
	const superChars = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾';
	const subChars = '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎';

	let inputArea: HTMLTextAreaElement;
	$effect(() => inputArea.focus());

	let copyTimeout: ReturnType<typeof setTimeout>;
	function queueCopy() {
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => navigator.clipboard.writeText(outputText), 500);
	}

	function convertText(toSmallText = true) {
		if (inputText == '') return;

		let preConvertedText = '';
		let apostrapheMatch, quotationMatch = false;

		const text = (toSmallText) ? inputText.toLowerCase() : outputText;

		const chars = textType ? smallTextChars : altTextChars;
		const scriptTypeChars = (scriptType == 1) ? subChars : superChars;

		for (let i = 0; i < text.length; i++) {
			const char = text[i];

			// Convert to better apostraphes & quotes
			if (char == "'") {
			    preConvertedText += (apostrapheMatch) ? '’' : '‘';
			    apostrapheMatch = !apostrapheMatch;
			} else if (char == '"') {
			    preConvertedText += (quotationMatch) ? '”' : '“';
			    quotationMatch = !quotationMatch;
			} else {
			    // Set character and fall back if char is not found in list
			    if (toSmallText) {
			        const index = normalAlphabet.indexOf(char);
			        const scriptIndex = scriptChars.indexOf(char);

			        if (scriptIndex !== -1) {
			            preConvertedText += (scriptType != 2) ?
			                scriptTypeChars[scriptIndex] : char;
			        } else {
			            preConvertedText += (index !== -1) ?
			                chars[index] : char;
			        };
			    } else { // Convert small to normal large text
			        const index = chars.indexOf(char);
			        const scriptIndex = scriptTypeChars.indexOf(char);

			        if (scriptIndex !== -1) {
			            preConvertedText += scriptChars[scriptIndex];
			        } else {
			            preConvertedText += (index !== -1) ?
			                normalAlphabet[index] : char;
			        };
			    };
			};
		};

		(toSmallText) ? outputText = preConvertedText : inputText = preConvertedText;

		if (autoCopy) queueCopy();
	}
</script>
<style>
	label, .row { display: flex; align-items: center; gap: var(--m); margin: var(--m) 0; }
	.inputs { display: flex; flex-direction: column; align-items: center; gap: var(--s); }
	textarea { width: 100%; height: 120px; resize: none; }
	input[type="range"] { width: 60px; }
</style>

<Modal>
	{#snippet header()}MC small text converter{/snippet}
	<label>
		<input type="checkbox" bind:checked={textType} onchange={() => convertText()}>
		Use alternate text style
		<MoreInfo>
			<img src="/media/tools/textconverter/texttypepreview.avif" alt="Shows difference between the text type function">
		</MoreInfo>
	</label>

	<div class="row">
		Subscript
		<MoreInfo>
			<img src="/media/tools/textconverter/subtext-demo.avif" alt="Subscript text demo">
		</MoreInfo>
		<input type="range" min="1" bind:value={scriptType} max="3" oninput={() => convertText()}>
		Superscript
		<MoreInfo>
			<img src="/media/tools/textconverter/supertext-demo.avif" alt="Superscript text demo">
		</MoreInfo>
	</div>
	<label>
		<input type="checkbox" bind:checked={autoCopy}>
		Auto copy small text on change
		<MoreInfo>This may spam your clipboard history</MoreInfo>
	</label>

	<div class="inputs">
		<textarea bind:this={inputArea} bind:value={inputText} oninput={() => convertText()} placeholder="Normal text"></textarea>
		<Icon name="down"/>
		<textarea bind:value={outputText} oninput={() => convertText(false)} placeholder="Small text"></textarea>
	</div>
</Modal>
