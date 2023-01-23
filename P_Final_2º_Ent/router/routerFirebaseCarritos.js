import { Router } from 'express';
import { createCart, getCartProducts, addProductToCart, deleteProductFromCart, deleteCart } from '../controllers/carritosFirebase.js';


const router = Router();

router.get('/:id/productos', getCartProducts);
router.post('/', createCart);
router.post('/:idCarrito/productos/:idProducto/', addProductToCart);
router.delete('/:id', deleteCart);
router.delete('/:idCarrito/productos/:id_prod', deleteProductFromCart);

export default router;
