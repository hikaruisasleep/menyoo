<script lang="ts">
    import type { PageData } from '../$types';

    export let data: PageData;
    export let showSelected: boolean;
    export let itemTypeSelector: boolean;

    let containerType = 'horizontalScroll';

    import ItemCard from './ItemCard.svelte';
</script>

<div class="scroll-x flex overflow-x-scroll w-[90vw] aspect-[3/1] max-h-32 gap-2">
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

<style lang="scss">
    .scroll-x {
        scroll-snap-type: x mandatory;

        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
