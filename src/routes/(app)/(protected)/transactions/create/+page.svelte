<script lang="ts">
    import { enhance } from "$app/forms";
    import { capitalizeFirstLetter } from "$lib/helpers/stringHelper";
    import { TransactionType } from "@prisma/client";
    import Alert from "$lib/components/Alert.svelte";
    import type { ActionData } from "./$types";
    import InputError from "$lib/components/InputError.svelte";

    export let form: ActionData;
</script>

<h2
    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
>
    New Transaction
</h2>

<div class="mt-10 w-full max-w-md mx-auto">
    <Alert message={form?.message} />
    <form class="space-y-6" method="POST" use:enhance>
        <div>
            <label
                for="title"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Title</label
            >
            <div class="mt-2">
                <input
                    id="title"
                    name="title"
                    type="title"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.title?._errors} />
            </div>
        </div>

        <div>
            <label
                for="description"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Description</label
            >
            <div class="mt-2">
                <input
                    id="description"
                    name="description"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.description?._errors} />
            </div>
        </div>

        <div>
            <label
                for="amount"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Amount</label
            >
            <div class="mt-2">
                <input
                    id="amount"
                    name="amount"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.amount?._errors} />
            </div>
        </div>

        <div>
            <label
                for="transactionType"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Type</label
            >
            <div class="mt-2">
                <select
                    id="transactionType"
                    name="transactionType"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    {#each Object.values(TransactionType) as type}
                        <option value={type}
                            >{capitalizeFirstLetter(type)}</option
                        >
                    {/each}
                </select>
                <InputError errors={form?.errors?.transaction_type?._errors} />
            </div>
        </div>

        <div>
            <label
                for="date"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Date</label
            >
            <div class="mt-2">
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.date?._errors} />
            </div>
        </div>
        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Sign in</button
            >
        </div>
    </form>
</div>
