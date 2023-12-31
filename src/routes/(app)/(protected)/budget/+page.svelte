<script lang="ts">
    import BudgetList from "$lib/components/BudgetList.svelte";
    import { TransactionType } from "@prisma/client";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<div class="flex justify-center items-center mt-10 lg:w-2/3 mx-auto">
    <h2
        class="flex-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
        Budget
    </h2>
    <a href="/budget/create" class="text-3xl">+</a>
</div>
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 flex gap-x-4">
        {#if data.status == 500 || !data.budgetItems}
            <p class="text-center text-xl text-red-300">{data.data?.message}</p>
        {:else}
            <BudgetList
                budgetItems={data.budgetItems.expenses}
                type={TransactionType.EXPENSE}
            />

            <BudgetList
                budgetItems={data.budgetItems.incomes}
                type={TransactionType.INCOME}
            />
        {/if}
    </div>
</section>
