import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productosMySql';

const router = Router();

const admin = true;

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/MySqlDB/productos metodo: POST, no autorizada' })
		: next();
};

router.get('/:id?', getProducts);
router.post('/', isAuthorized, createProduct );
router.put('/:id', isAuthorized, updateProduct);
router.delete('/:id', isAuthorized, deleteProduct);

export default router;
