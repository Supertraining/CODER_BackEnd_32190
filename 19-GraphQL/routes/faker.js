import { Router } from 'express'
import { getFakerProducts } from '../controllers/faker.js';

const fakerRouter = Router();

fakerRouter.get('/productos-test', getFakerProducts)

export default fakerRouter;