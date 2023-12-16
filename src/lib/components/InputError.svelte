<script lang="ts">
    export let errors: string[] | undefined
</script>

 {#if (errors?.length)}
    {#each errors as error }
        <p class="text-red-500">{error}</p>
    {/each}
 {/if}
