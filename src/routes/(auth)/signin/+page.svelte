<script lang="ts">
    import { enhance } from "$app/forms";
    import Alert from "$lib/components/Alert.svelte";
    import InputError from "$lib/components/InputError.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<h2
    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
>
    Sign in to your account
</h2>

<div class="mt-10 w-full max-w-md mx-auto">
    <Alert message={form?.message} />
    <form class="space-y-6" method="POST" use:enhance>
        <div>
            <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
            >
            <div class="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <InputError errors={form?.errors?.email?._errors} />
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                >
                <div class="text-sm">
                    <a
                        href="/forgotpassword"
                        class="font-semibold text-indigo-600 hover:text-indigo-500"
                        >Forgot password?</a
                    >
                </div>
            </div>
            <div class="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.password?._errors} />
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

    <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a
            href="/signup"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
            Sign up
        </a>
    </p>
</div>
