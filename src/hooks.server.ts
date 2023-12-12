import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authRequest = auth.handleRequest(event)
    const session = await authRequest.validate();

    if (isRouteProtected(event.route.id) && !session) {
        throw redirect(301, '/login')
    }

    if (isAuthRoute(event.route.id) && session) {
        throw redirect(301, '/')
    }

    event.locals.session = session;
    event.locals.auth = authRequest;
    return await resolve(event)
}

function isRouteProtected(routeId: string | null): boolean {
    return !routeId ? false : routeId.includes('/(protected)')
};

function isAuthRoute(routeId: string | null): boolean {
    return !routeId ? false : routeId.includes('/(auth)')
}
