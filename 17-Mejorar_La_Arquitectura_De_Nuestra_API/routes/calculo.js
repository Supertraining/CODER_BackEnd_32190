import { Router }  from 'express';
import { calcular } from '../controllers/calculo.js';


const calculoRouter = Router();


calculoRouter.get('/randoms', calcular
)

export default calculoRouter