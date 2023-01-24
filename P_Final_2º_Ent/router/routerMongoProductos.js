import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productosMongo.js';

const router = Router();

router.get('/:id?', getProducts);
router.post('/', isAuthorized, createProduct);
router.put('/:id', isAuthorized, updateProduct);
router.delete('/:id', isAuthorized, deleteProduct);

export default router;
