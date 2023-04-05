import Router from "koa-router";
import compression from 'compression';
import { info, infoBloq } from "../controllers/info.js";


const infoRouter = new Router({
    prefix: '/api'
});

infoRouter.get('/info', info);

infoRouter.get('/infoBLOQ', compression(), infoBloq);

export default infoRouter.routes();

