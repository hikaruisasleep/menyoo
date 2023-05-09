<script lang="ts">
	import ItemCard from './components/ItemCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hidden = true;

	let showSelected = false;
	let itemTypeSelector = true;
</script>

<div class="container flex flex-1 flex-col">
	<div class="filter flex flex-initial flex-col min-h-min">
		<i
			class="fa-solid fa-filter fa-xl h-4"
			on:click={() => (hidden = !hidden)}
			on:keypress={() => (hidden = !hidden)}
		/>
		<form action="get" class:hidden>
			<label for="sort-by-type" class="flex flex-row py-1">
				<p class="flex-initial text-sm mx">Only show selected item type</p>
				<input
					type="checkbox"
					name="type"
					class="flex-initial text-lg mx-2"
					bind:checked={showSelected}
				/>
			</label>
			<label for="item-type" class="flex flex-row py-1">
				<p class="flex-initial text-sm mx">Food/Drink</p>
				<input
					type="checkbox"
					name="type"
					bind:checked={itemTypeSelector}
					class="flex-initial text-lg mx-2"
				/>
			</label>
		</form>
	</div>

	<div class="food-list flex flex-row">
		{#each data.items as item (item._id)}
			{#if showSelected}
				{#key itemTypeSelector}
					{#if itemTypeSelector == item.type}
						<ItemCard {item} />
					{/if}
				{/key}
			{:else}
				<ItemCard {item} />
			{/if}
		{/each}
	</div>
</div>
