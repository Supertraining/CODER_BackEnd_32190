import Router from "koa-router";
import { nonExistentRoutes } from "../controllers/non-ExistentRoutes.js";

const noRouteRouter =new Router();

noRouteRouter.all("/(.*)", nonExistentRoutes)

export default noRouteRouter.routes();