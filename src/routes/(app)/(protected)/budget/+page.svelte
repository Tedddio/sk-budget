<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

{#if data.budgetItems && data.budgetItems.length > 0}
    {#each data.budgetItems as item}
        <p>{JSON.stringify(item)}</p>
    {/each}
{/if}
