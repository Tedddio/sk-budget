<script lang="ts">
    import { enhance } from "$app/forms";
    import InputError from "$lib/components/InputError.svelte";
    import Alert from "$lib/components/Alert.svelte";

    export let form;
</script>

<h2
    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
>
    Register
</h2>

<div class="mt-10 w-full max-w-md mx-auto">
    <Alert message={form?.message} />
    <form class="space-y-6" method="POST" use:enhance>
        <div class="flex w-full gap-x-2">
            <div class="w-full">
                <label
                    for="firstName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                >
                    First name
                </label>
                <div class="mt-2">
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <InputError errors={form?.errors?.firstName?._errors} />
                </div>
            </div>
            <div class="w-full">
                <label
                    for="lastName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                >
                    Last name
                </label>
                <div class="mt-2">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <InputError errors={form?.errors?.lastName?._errors} />
                </div>
            </div>
        </div>

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
                <InputError errors={form?.errors?.email?._errors} />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                >
            </div>
            <div class="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.password?._errors} />
            </div>
        </div>

        <div>
            <div class="flex items-center justify-between">
                <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Confirm Password</label
                >
            </div>
            <div class="mt-2">
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <InputError errors={form?.errors?.confirmPassword?._errors} />
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
        Already a member?
        <a
            href="/signin"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
            Sign in
        </a>
    </p>
</div>
