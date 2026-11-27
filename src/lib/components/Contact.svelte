<script lang="ts">
	import { Turnstile } from 'svelte-turnstile';
	import { notify } from '#lib/shell.svelte';
	import Modal from './Modal.svelte';

	let buttonText = $state('Send message');

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		buttonText = 'Sending message...';

		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://contact.amazinaxel.workers.dev');
		xhr.onload = () => {
			const sent = xhr.status == 200;
			buttonText = sent ? 'Message sent' : 'Resubmit';
			notify(sent ? 'Message sent' : 'Message not sent', sent ? 'Thanks for reaching out!' : xhr.responseText);
		};
		xhr.send(new FormData(event.target as HTMLFormElement));
	}
</script>

<Modal>
	{#snippet header()}Contact{/snippet}
	<p>Reach out to <code>@amazinaxel</code> on Discord for a faster response. Include a contact method if you would like a reply.</p>
	<form method="POST" onsubmit={handleSubmit}>
		<!-- svelte-ignore a11y_autofocus -->
		<input type="text" name="title" placeholder="Subject" autofocus/>
		<textarea name="message" placeholder="Message"></textarea>
		<Turnstile siteKey="0x4AAAAAAAEGFTl2ESubJ-n9" theme="dark"/>
		<button type="submit">{buttonText}</button>
	</form>
</Modal>

<style>
	p { margin: 0; }

	form {
		display: flex;
		flex-direction: column;
		gap: var(--m);
	}

	textarea {
		height: 150px;
		resize: none;
	}
</style>
