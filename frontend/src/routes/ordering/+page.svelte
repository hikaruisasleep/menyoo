<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h3>{data.title}</h3>
<div>{@html data.content}</div>