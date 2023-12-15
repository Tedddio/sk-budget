import type { SessionUser } from "$lib/types/SessionUser";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    let { user } = locals;
    if (user) {
        return { user: user as SessionUser };
    }
}

