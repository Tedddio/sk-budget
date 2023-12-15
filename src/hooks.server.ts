import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authRequest = auth.handleRequest(event)
    const session = await authRequest.validate();

    if (isRouteProtected(event.route.id) && !session) {
        throw redirect(301, '/signin')
    }

    if (isAuthRoute(event.route.id) && session) {
        throw redirect(301, '/')
    }

    event.locals.auth = authRequest;
    event.locals.session = session;
    event.locals.user = session?.user;
    return await resolve(event)
}

function isRouteProtected(routeId: string | null): boolean {
    return !routeId ? false : routeId.includes('/(protected)')
};

function isAuthRoute(routeId: string | null): boolean {
    return !routeId ? false : routeId.includes('/(auth)')
}

