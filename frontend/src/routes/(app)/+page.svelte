<script lang="ts">
    import type { PageData } from './$types';

    import Cards from './components/Cards.svelte';

    export let data: PageData;
    let hidden = true;

    let filters = {
        showSelected: false,
        itemTypeSelector: true,
    };
</script>

<div class="container flex flex-1 flex-col">
    <div class="filter grid grid-cols-10 my-2">
        <form action="get" class="col-span-10 row-span-1 max-h-min flex flex-initial">
            <input
                type="search"
                name="search"
                placeholder="Mau makan apa hari ini?"
                class="text-lg w-full px-2"
            />
            <button type="button" class="my-0 ml-2">
                <i class="fa-solid fa-search fa-xl h-4 col-start-10 row-start-1" />
            </button>
        </form>
    </div>

    <hr />

    <Cards {data} />
</div>
