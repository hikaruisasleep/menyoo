<script lang="ts">
    export let vendor: any;
</script>

<div
    class="scroll-child container bg-darkgrey min-w-max aspect-[3/2] rounded border border-solid border-black m-0 max-w-full"
>
    <div class="grid grid-cols-5 grid-rows-4 w-full h-full">
        <div class="col-start-1 row-start-3 col-span-2">
            <p
                class="w-full h-full text-lg text-black font-bold leading-tight flex flex-auto justify-start items-center"
            >
                {vendor.name}
            </p>
        </div>
        <div class="col-start-5 row-start-1 col-span-1">
            <p
                class="w-full h-full text-2xs text-black leading-tight flex flex-auto justify-center items-center"
            >
                {#if vendor.type}
                    <i class="fa-solid fa-pot-food" />
                {:else if !vendor.type}
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
                {vendor.price.toString().slice(0, -3)}K
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
