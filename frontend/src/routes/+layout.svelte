<script>
    import '../app.postcss';
    import '../app.scss';
</script>

<svelte:head>
    <title>menyoo: Development Edition</title>
</svelte:head>

<div class="container mx-auto py-4 bg-black">
    <a href="/" class="bg-transparent p-0 text-white"
        ><h1 class="text-4xl text-center font-bold">menyoo_</h1></a
    >
</div>

<div class="px-5">
    <slot />
</div>
