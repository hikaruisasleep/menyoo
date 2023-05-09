<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let action = data.mode;
	let id: string | null;
	let item: any;

	switch (action) {
		case 'edit':
			id = data.id;
			item = data.item;
			break;
		case 'new':
			break;
		default:
			break;
	}
</script>

<form method="post" action="?/{action}">
	<p>{action} mode</p>
	{#if action == 'edit'}
		<p>editing {id}</p>
	{/if}
	<label for="name" class="flex flex-col py-1">
		<p class="flex-auto text-sm">Item Name</p>
		<input type="text" name="name" class="flex-1 text-lg" value={item.name} />
	</label>
	<label for="price" class="flex flex-col py-1">
		<p class="flex-auto text-sm">Price</p>
		<input type="text" name="price" class="flex-1 text-lg" value={item.price} />
	</label>
	<label for="desc" class="flex flex-col py-1">
		<p class="flex-auto text-sm">Description</p>
		<input type="text" name="desc" class="flex-1 text-lg" value={item.description} />
	</label>
	<label for="type" class="flex flex-col py-1">
		<p class="flex-auto text-sm">Food/Drink</p>
		<input type="checkbox" name="type" class="flex-1 text-lg" bind:checked={item.type} />
	</label>
	{#if action == 'edit'}
		<input type="text" name="id" class="hidden" value={id} />
		<button type="submit" formaction="?/delete"><i class="fa-solid fa-trash-can" /></button>
	{/if}
	<button type="submit">Submit</button>
</form>
