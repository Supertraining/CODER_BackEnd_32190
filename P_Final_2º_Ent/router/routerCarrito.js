const express = require('express');
const contenedorCarrito = require('../api/contenedorCarrito.js');

const app = express();
const router = express.Router();
app.use('/api/carrito', router);

router.get('/:id/productos', (req, res) => {
	contenedorCarrito.getByCartId(+req.params.id).then((data) => res.json(data));
});
router.post('/', (req, res) => {
	contenedorCarrito.createCart(req.body).then((data) => {
		res.json(data);
	});
});
router.post('/:idCarrito/productos/:idProducto/', (req, res) => {
	contenedorCarrito
		.addProduct(+req.params.idCarrito, +req.params.idProducto)
		.then((data) => res.json(data));
});
router.delete('/:id', (req, res) => {
	const id = +req.params.id;
	contenedorCarrito.deleteCartById(id).then((data) => res.json(data));
});
router.delete('/:idCarrito/productos/:id_prod', (req, res) => {
	contenedorCarrito
		.deleteCartProductById(+req.params.idCarrito, +req.params.id_prod)
		.then((data) => res.json(data));
});

module.exports = router;
