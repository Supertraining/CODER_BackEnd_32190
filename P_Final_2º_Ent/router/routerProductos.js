import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, isAuthorized } from '../controllers/productosLocal.js';

const router = Router();

router.get('/:id?', getProducts);
router.post('/', isAuthorized, createProduct);
router.put('/:id', isAuthorized, updateProduct);
router.delete('/:id', isAuthorized, deleteProduct);

export default router;
