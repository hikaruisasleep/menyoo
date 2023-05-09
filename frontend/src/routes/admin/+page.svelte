<script lang="ts">
	import type { PageData } from './$types';
	import ItemsEditor from './components/ItemsEditor.svelte';

	export let data: PageData;
</script>

{#if !data.success}
	<div class="container flex flex-auto flex-col h-[70vh] justify-center gap-y-16">
		<h2 class="text-center text-2xl">Please log in</h2>
		<a href="/admin/login" class="text-lg text-center w-full">Log in</a>
	</div>
{/if}

{#if data.success}
	<nav class="flex flex-row justify-between py-2 text-lg">
		<p class="p-1">Logged in as <span class="text-accent-light">{data.res.name}</span></p>
		<form action="/admin/login?/logout" method="post">
			<button type="submit" class="bg-primary-light m-0 p-1">logout</button>
		</form>
	</nav>
	<div>
		<ItemsEditor items={data.items} />
	</div>
{/if}
