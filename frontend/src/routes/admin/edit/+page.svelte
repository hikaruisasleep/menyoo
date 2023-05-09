<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    let action = data.mode;
    let id: string | null;
    let item = data.item;

    switch (action) {
        case 'edit':
            id = data.id;
            break;
        case 'new':
            break;
        default:
            break;
    }

    function toggleCheckbox() {
        item.type = !item.type;
    }
</script>

<form method="post" action="?/{action}" class="flex flex-col">
    <p>{action} mode</p>
    {#if action == 'edit'}
        <p>editing {id}</p>
    {/if}
    <label for="name" class="flex flex-auto flex-col py-1">
        <p class="flex-auto text-sm">Item Name</p>
        <input type="text" name="name" class="flex-1 text-lg" value={item.name} />
    </label>
    <label for="price" class="flex flex-col py-1">
        <p class="flex-auto text-sm">Price</p>
        <input type="text" name="price" class="flex-1 text-lg" value={item.price} />
    </label>
    <label for="desc" class="flex flex-col py-1">
        <p class="flex-auto text-sm">Description</p>
        <input type="text" name="desc" class="flex-1 text-lg" value={item.description} />
    </label>
    <label for="type" class="flex flex-1 flex-row items-center gap-4 py-1 pillswitch">
        <p class="flex-initial text-sm">Food/Drink</p>
        <input type="checkbox" name="type" class="flex-initial text-lg" bind:checked={item.type} />
        <span class="slider" on:click={toggleCheckbox} on:keypress={toggleCheckbox} />
    </label>
    {#if action == 'edit'}
        <input type="hidden" name="id" value={id} readonly />
        <button type="submit" formaction="?/delete" class="bg-primary-light"
            ><i class="fa-solid fa-trash-can" /></button
        >
    {/if}
    <button type="submit" class="bg-primary-light">Submit</button>
</form>

<style lang="scss">
    .pillswitch {
        position: relative;
        display: flex;
        height: 1.5rem;

        input {
            opacity: 0;

            &:checked + .slider {
                background-color: $accent-light;
            }

            &:focus + .slider {
                box-shadow: 0 0 1px #2196f3;
            }

            &:checked + .slider:before {
                -webkit-transform: translateX(1.5rem);
                -ms-transform: translateX(1.5rem);
                transform: translateX(1.5rem);
            }
        }

        .slider {
            position: relative;
            cursor: pointer;
            background-color: #ccc;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            min-width: 3rem;
            min-height: 1.5rem;
            border-radius: 1rem;
            left: -2rem;

            &::before {
                position: absolute;
                content: '';
                height: 1rem;
                width: 1rem;
                top: 0.25rem;
                left: 0.25rem;
                background-color: white;
                border-radius: 50%;
                -webkit-transition: 0.4s;
                transition: 0.4s;
            }
        }
    }
</style>
