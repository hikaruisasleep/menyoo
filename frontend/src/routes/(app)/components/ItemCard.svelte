<script lang="ts">
    export let item: any;

    export let containerType: string;
</script>

<div
    class="scroll-child container bg-darkgrey min-w-max aspect-[3/2] rounded border border-solid border-black m-0 lg:w-96 max-w-full"
>
    <div class="grid grid-cols-5 grid-rows-4 w-full h-full">
        <div class="col-start-1 row-start-3 col-span-2">
            <p
                class="w-full h-full text-lg text-black font-bold leading-tight flex flex-auto justify-start items-center"
            >
                {item.name}
            </p>
        </div>
        <div class="col-start-3 row-start-3 col-span-3">
            <p
                class="w-full h-full text-sm text-black leading-tight flex flex-auto justify-end items-center"
            >
                {item.vendor_name}
            </p>
        </div>
        <div class="col-start-1 row-start-4 col-span-3">
            <p
                class="w-full h-full text-sm text-black leading-tight flex flex-auto justify-start items-start truncate"
            >
                {item.description}
            </p>
        </div>
        <div class="col-start-5 row-start-1 col-span-1">
            <p
                class="w-full h-full text-2xs text-black leading-tight flex flex-auto justify-center items-center"
            >
                {#if item.type}
                    <i class="fa-solid fa-pot-food" />
                {:else if !item.type}
                    <i class="fa-solid fa-wine-glass" />
                {:else}
                    <i class="fa-solid fa-exclamation" />
                {/if}
            </p>
        </div>
        <div class=" col-start-5 row-start-4 col-span-1">
            <p
                class="w-full h-full text-lg text-black leading-tight flex flex-auto justify-center items-center"
            >
                {item.price.toString().slice(0, -3)}K
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    .scroll-child {
        scroll-snap-align: start;
        background-color: $secondary-light;
    }
</style>
