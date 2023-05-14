<script lang="ts">
    import type { PageData } from './$types';

    import Cards from './components/Cards.svelte';

    export let data: PageData;
    let hidden = true;

    let showSelected = false;
    let itemTypeSelector = true;
</script>

<div class="container flex flex-1 flex-col">
    <div class="filter grid grid-cols-10 my-2">
        <form action="get" class="col-span-9">
            <input
                type="search"
                name="search"
                placeholder="What do you want to eat today?"
                class="text-lg w-full"
            />
        </form>
        <i
            class="fa-solid fa-filter fa-xl h-4"
            on:click={() => (hidden = !hidden)}
            on:keypress={() => (hidden = !hidden)}
        />
        <form action="get" class:hidden class="col-span-10">
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

    <hr />

    <Cards {data} {itemTypeSelector} />
</div>
