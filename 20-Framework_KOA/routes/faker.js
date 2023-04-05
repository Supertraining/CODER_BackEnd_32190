import Router from "koa-router";
import { getFakerProducts } from '../controllers/faker.js';

const fakerRouter = new Router({
    prefix: '/api'
});

fakerRouter.get('/productos-test', getFakerProducts)

export default fakerRouter.routes();