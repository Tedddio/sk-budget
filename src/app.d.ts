// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface PageData {}
        // interface Platform {}
        interface Locals {
            auth: import("lucia").AuthRequest;
            session: import("lucia").Session | null;
            user: import("lucia").User | undefined
        }
    }
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			firstname: string;
			lastname: string;
			email: string;
		};
        type DatabaseSessionAttributes = {};
	}
}

export { };
