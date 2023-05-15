<script lang="ts">
    import type { PageData } from '../$types';

    export let data: PageData;

    import VendorCard from './VendorCard.svelte';
</script>

<div class="container flex flex-col gap-4 my-4">
    {#each data.vendors as vendor (vendor._id)}
        <VendorCard {vendor} />
    {/each}
</div>
