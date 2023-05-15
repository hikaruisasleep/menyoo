<script lang="ts">
    export let vendor: any;
</script>

<div
    class="scroll-child container bg-darkgrey aspect-[3/2] rounded border border-solid border-black m-0 hover:shadow-xl"
>
    <div class="grid grid-cols-4 grid-rows-6 w-full h-full">
        <div
            class="max-h-full col-start-1 row-start-4 col-span-2 row-span-1 flex flex-initial items-end"
        >
            <p
                class="h-fit text-2xl text-white font-bold leading-tight pl-4 relative z-10 mb-1 shadowtext"
            >
                {vendor.name}
            </p>
        </div>
        <div class="max-h-full col-start-1 row-start-5 col-span-4 row-span-1">
            <p
                class="w-full max-h-full text-sm text-black leading-tight px-4 descbox mt-1 opacity-90"
            >
                {vendor.description}
            </p>
        </div>
        <div
            class="w-full max-h-full col-start-1 row-start-6 col-span-4 row-span-1 flex flex-row flex-1 justify-start items-end mb-1"
        >
            {#each vendor.tags as tag}
                {#if tag != 'makanan' && tag != 'minuman' && tag != 'ringan' && tag != 'asia'}
                    <p
                        class="w-full max-h-min text-xs text-black leading-tight px-4 whitespace-nowrap opacity-70"
                    >
                        {tag}
                    </p>
                {/if}
            {/each}
        </div>
        <div
            class="max-h-full col-start-1 row-start-1 col-span-4 row-span-4 overflow-hidden flex flex-auto items-start"
        >
            <img
                src="https://picsum.photos/2000/1000"
                class="w-full min-w-full object-contain m-0 p-0"
            />
        </div>
        <div class="col-start-4 row-start-1 col-span-1 row-span-1">
            <p
                class="w-full max-h-full text-xl text-black leading-tight flex flex-auto justify-end items-start p-4 shadowtext-white"
            >
                {#if vendor.type == true}
                    <i class="fa-solid fa-bowl-food" />
                {:else if vendor.type == false}
                    <i class="fa-solid fa-wine-glass" />
                {:else}
                    <i class="fa-solid fa-exclamation fa-bold" />
                {/if}
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    .scroll-child {
        scroll-snap-align: start;
        background-color: $secondary-light;
    }

    p {
        &.descbox {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.shadowtext {
            filter: drop-shadow(2px 2px 5px #000);
        }

        &.shadowtext-white {
            filter: drop-shadow(0 0 5px rgb(255 255 255 / 0.8));
        }
    }
</style>
