<script lang="ts">
    import type { PageData } from '../$types';

    export let data: PageData;
    export let showSelected: boolean;
    export let itemTypeSelector: boolean;

    let containerType = 'classicCards';

    import ItemCard from './ItemCard.svelte';
</script>

<div class="container grid grid-flow-row grid-cols-2 w-[90vw] gap-2">
    {#each data.items as item (item._id)}
        {#if showSelected}
            {#key itemTypeSelector}
                {#if itemTypeSelector == item.type}
                    <ItemCard {item} {containerType} />
                {/if}
            {/key}
        {:else}
            <ItemCard {item} {containerType} />
        {/if}
    {/each}
</div>
