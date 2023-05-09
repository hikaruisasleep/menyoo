<script lang="ts">
    export let item: any;
    export let itemType = translateItemType(item.type);

    function translateItemType(type: boolean) {
        let itemType: string;
        switch (type) {
            case true:
                itemType = 'food';
                break;
            case false:
                itemType = 'drinks';
                break;
        }
        return itemType;
    }
</script>

<div
    class="container bg-darkgrey rounded border border-solid border-black p-1 flex flex-auto h-32 w-full"
>
    <div class="flex flex-col flex-1 h-24 max-w-[90%]">
        <p class="text-ellipsis">{item._id}</p>

        <div class="text-left max-w-[80%] overflow-clip">
            <p class="text-lg text-black">{item.name}</p>
            <p class="text-base text-black">{itemType}</p>
            <p class="text-xs text-black truncate">{item.description}</p>
            <p class="text-lg text-black">{item.price.toString().substr(0, 2)}K</p>
        </div>
    </div>

    <form action="?/edit" method="post" class="flex flex-col items-end">
        <a href="/admin/edit?mode=edit&id={item._id}" class="m-0">
            <i class="fa-solid fa-pencil" />
        </a>
    </form>
</div>
