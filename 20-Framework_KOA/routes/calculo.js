import Router from "koa-router";
import { calcular } from '../controllers/calculo.js';


const calculoRouter = new Router({
    prefix: '/api'
});


calculoRouter.get('/randoms', calcular);

export default calculoRouter.routes();