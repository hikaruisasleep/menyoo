<script lang="ts">
    import type { PageData } from '../$types';

    export let data: PageData;
    export let filters: { [x: string]: any };

    import VendorCard from './VendorCard.svelte';
</script>

<div class="container grid grid-flow-row grid-cols-2 gap-2">
    {#each data.vendors as vendor (vendor._id)}
        {#if filters.showSelected}
            {#key filters.itemTypeSelector}
                {#if filters.itemTypeSelector == vendor.type}
                    <VendorCard {vendor} />
                {/if}
            {/key}
        {:else}
            <VendorCard {vendor} />
        {/if}
    {/each}
</div>
