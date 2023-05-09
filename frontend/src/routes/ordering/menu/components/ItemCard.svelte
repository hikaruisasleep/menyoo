<script lang="ts">
	export let item: any;
	export let editable = false;
	export let itemType = translateItemType(item.type);

	function translateItemType(type: boolean) {
		let itemType: string;
		switch (type) {
			case true:
				itemType = 'food';
				break;
			case false:
				itemType = 'drinks';
				break;
		}
		return itemType;
	}
</script>

<div
	class="container bg-darkgrey max-w-[25%] aspect-[2/3] rounded border border-solid border-black mx-1"
>
	{#if editable}
		<p class="text-ellipsis">{item._id}</p>
	{/if}

	<div class="text-center">
		<p class="text-lg text-black">{item.name}</p>
		<p class="text-base text-grey">{itemType}</p>
		<p class="text-xs text-grey">{item.description}</p>
		<p class="text-lg text-white">{item.price.toString().substr(0, 2)}K</p>
	</div>

	{#if editable}
		<form action="?/edit" method="post">
			<a href="/admin/edit?mode=edit&id={item._id}">
				<i class="fa-solid fa-pencil" class:hidden={!editable} />
			</a>
		</form>
	{/if}
</div>
