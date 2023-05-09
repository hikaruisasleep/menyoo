<script lang="ts">
	import ItemCard from './ItemCard.svelte';

	export let items: any[] = [];
	export let editable = true;
</script>

<nav class="my-2">
	<a href="/admin/edit?mode=new">
		<i class="fa-solid fa-plus" />
		Add new item
	</a>
</nav>

<div class="items-list container flex flex-col">
	{#each items as item (item._id)}
		<ItemCard {item} {editable} />
	{/each}
</div>
