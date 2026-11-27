<script lang="ts">
	import Icon from "#lib/components/Icon.svelte";
	import Shell from '#lib/components/Shell.svelte';
	let { data, children } = $props();
</script>
<svelte:head>
	<link rel="stylesheet" href="/css/cabin.css"/>
</svelte:head>
<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--m);
		max-width: 58rem; /* minus two rem for the padding equalization */
		margin: auto;
		padding: var(--l);
		font-size: 0.8rem;
		color: var(--blue2);
		background-color: var(--dark2);
	}
	footer p { margin: 0; }
	footer a { height: min-content; }
</style>

<Shell hero={data.hero}/>

	<div id="content">
		{@render children?.()}
	</div>

	<footer>
		<div>
			<p>&copy;2016-{new Date().getFullYear()} • AmazinAxel/Alec</p>
			<a href="https://github.com/AmazinAxel/site" target="_blank" rel="noopener noreferrer">Site last generated on {data.date} <Icon name="external"/></a>
		</div>
		<a href="https://derpydoggo.is-a.dev" target="_blank" rel="noopener noreferrer">lil' bro's site <Icon name="external"/></a>
	</footer>
