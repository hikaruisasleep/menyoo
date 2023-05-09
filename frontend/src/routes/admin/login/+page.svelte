<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h2 class="text-center my-2 text-xl">login page</h2>

<form method="post" class="flex flex-auto flex-col" action="?/login">
	<label for="name" class="flex flex-col py-1">
		<p class="flex-auto text-sm">Location ID</p>
		<input type="text" name="login" class="flex-auto h-8 text-sm rounded-xl px-3" />
	</label>

	<label for="password" class="flex flex-col">
		<p class="flex-auto text-sm">Password</p>
		<input type="password" name="password" class="flex-auto h-8 text-sm rounded-xl px-3" />
	</label>
	<button type="submit" class="text-lg bg-primary-light">login</button>
</form>

{#if form?.success === false}
	<p>Error: {form?.err}</p>
{/if}
