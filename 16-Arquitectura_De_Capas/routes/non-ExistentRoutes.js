import { Router } from "express";
import { nonExistentRoutes } from "../controllers/non-ExistentRoutes.js";

const noRouteRouter = Router();

noRouteRouter.all("/*", nonExistentRoutes)

export default noRouteRouter;