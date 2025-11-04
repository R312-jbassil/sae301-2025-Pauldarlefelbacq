import pb from "../../backend/backend.mjs";

export const onRequest = async (context, next) => {
  const cookie = context.cookies.get("pb_auth")?.value;
    if (cookie) {
        pb.authStore.loadFromCookie(cookie);
        if (pb.authStore.isValid) {
            context.locals.user = pb.authStore.record;
        }
    }

    if (context.url.pathname.startsWith('/api/')) {
        if (!context.locals.user && context.url.pathname !== '/api/login' && context.url.pathname !== '/api/register') {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        return next();
    }

    if (!context.locals.user) {
        if (context.url.pathname !== '/connection' && context.url.pathname !== '/')
            return Response.redirect(new URL('/connection', context.url), 303);
    }
    return next();
}