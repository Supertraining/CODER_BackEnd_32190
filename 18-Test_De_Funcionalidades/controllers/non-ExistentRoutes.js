import { routeLogger } from "../Logger/Logger.js";

export const nonExistentRoutes = async (req, res) => {
    try {
        const { url, method } = await req
        routeLogger(req, 'warn');
        res.send(`La ruta ${method} ${url} no esta implementada`)
    } catch (error) {
        routeLogger(req, 'error', error);
    }
}