<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";

    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

<Nav user={data.user} />
<div class="container mx-auto mt-10">
    <slot />
</div>
