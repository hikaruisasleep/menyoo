<script>
    import '../app.postcss';
    import '../app.scss';
</script>

<svelte:head>
    <title>menyoo: Development Edition</title>
</svelte:head>

<div class="px-5 prefer-vertical">
    <slot />
</div>

<style lang="scss">
    .prefer-vertical {
        width: min(80ch, 100% - 3rem);
        margin-inline: auto;
    }
</style>
