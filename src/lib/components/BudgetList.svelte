<script lang="ts">
    import { capitalizeFirstLetter } from "$lib/helpers/stringHelper";
    import type { BudgetItem, TransactionType } from "@prisma/client";
    import DeleteBudgetItem from "./DeleteBudgetItem.svelte";

    export let budgetItems: BudgetItem[];
    export let type: TransactionType;

    function getTotal(): string | undefined {
        if (!budgetItems) return;
        const total = budgetItems.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        return total.toFixed(2);
    }
</script>

<section class="w-full text-gray-600 body-font">
    {#if budgetItems?.length == 0}
        <p class="text-center text-xl">No items in the budget yet</p>
    {:else}
        <div class="w-full mx-auto overflow-auto">
            <h1 class="text-center text-2xl mb-2">
                {capitalizeFirstLetter(type.toString())}s
            </h1>
            <table class="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr>
                        <th
                            class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
                            >Title</th
                        >
                        <th
                            class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
                            >Description</th
                        >
                        <th
                            class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
                            >Amount</th
                        >
                        <th
                            class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
                            >Frequency</th
                        >
                        <th
                            class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
                        />
                    </tr>
                </thead>
                <tbody>
                    {#each budgetItems as item}
                        <tr>
                            <td class="px-4 py-3">{item.title}</td>
                            <td class="px-4 py-3">{item.description}</td>
                            <td class="px-4 py-3">{item.amount.toFixed(2)} $</td
                            >
                            <td class="px-4 py-3"
                                >{capitalizeFirstLetter(item.frequency)}</td
                            >
                            <td class="px-4 py-3">
                                <DeleteBudgetItem budgetItem={item} action="/budget?/delete" />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <p class="text-center">Total: {getTotal()} $</p>
        </div>
    {/if}
</section>
