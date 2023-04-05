import { routeLogger } from "../Logger/Logger.js";

export const nonExistentRoutes = async (ctx) => {
    try {
        const { url, method } = await ctx.request
        routeLogger(ctx.request, 'warn');
        ctx.response.send(`La ruta ${method} ${url} no esta implementada`)
    } catch (error) {
        routeLogger(ctx.request, 'error', error);
    }
}