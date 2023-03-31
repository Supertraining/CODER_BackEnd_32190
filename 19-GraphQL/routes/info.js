import { Router } from "express";
import compression from 'compression';
import { info, infoBloq } from "../controllers/info.js";


const infoRouter = Router();

infoRouter.get('/info', compression(), info);

infoRouter.get('/infoBLOQ', compression(), infoBloq);

export default infoRouter;

