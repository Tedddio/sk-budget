<script lang="ts">
    import type { PageData } from "./$types";
    import { capitalizeFirstLetter } from "$lib/helpers/stringHelper";
    import { TransactionType, type Transaction } from "@prisma/client";

    export let data: PageData;

    const reducer = (accumulator: number, item: Transaction) => {
        if (item.transaction_type == TransactionType.EXPENSE) {
            return accumulator - item.amount;
        }
        return accumulator + item.amount;
    };

    const total = data.transactions.reduce(reducer, 0);

    function getTransactionTypeColor(type: TransactionType) {
        if (type == TransactionType.INCOME) {
            return "text-green-500";
        }
        return "text-red-500";
    }
</script>

<div class="flex justify-center items-center mt-10 lg:w-2/3 mx-auto">
    <h2
        class="flex-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
        Transactions
    </h2>
    <a href="/transactions/create" class="text-3xl">+</a>
</div>
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        {#if data.transactions.length == 0}
            <p class="text-center text-xl">No transactions yet</p>
        {:else}
            <div class="lg:w-2/3 w-full mx-auto overflow-auto">
                <table class="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th
                                class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl"
                                >Date</th
                            >
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
                                >Type</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.transactions as transaction}
                            <tr>
                                <td class="px-4 py-3"
                                    >{transaction.date.toLocaleDateString()}</td
                                >
                                <td class="px-4 py-3">{transaction.title}</td>
                                <td class="px-4 py-3"
                                    >{transaction.description}</td
                                >
                                <td class="px-4 py-3"
                                    >{transaction.amount.toFixed(2)} $</td
                                >
                                <td
                                    class="px-4 py-3 text-lg text-gray-900 {getTransactionTypeColor(
                                        transaction.transaction_type,
                                    )}"
                                    >{capitalizeFirstLetter(
                                        transaction.transaction_type,
                                    )}</td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <p class="text-center text-md mt-10">Total is { total.toFixed(2) } $</p>
        {/if}
    </div>
</section>
