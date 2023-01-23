import { Router } from 'express';
import { createCart, deleteCart, deleteProductFromCart, getCartsProducts, addProductToCart } from '../controllers/carritosLocal.js';

const router = Router();

router.get('/:id/productos', getCartsProducts);
router.post('/', createCart);
router.post('/:idCarrito/productos/:idProducto/', addProductToCart);
router.delete('/:id', deleteCart);
router.delete('/:idCarrito/productos/:id_prod', deleteProductFromCart);

export default router
