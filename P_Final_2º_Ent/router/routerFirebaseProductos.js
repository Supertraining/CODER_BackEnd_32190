import { Router } from 'express';
import { getProducts, isAuthorized, createProduct, updateProduct, deleteProduct } from '../controllers/productosFirebase.js';


const router = Router();

const admin = true;


router.get('/:id?', getProducts);
router.post('/', isAuthorized, createProduct);
router.put('/:id', isAuthorized, updateProduct);
router.delete('/:id', isAuthorized, (req, res) => {
	
});

export default router;
