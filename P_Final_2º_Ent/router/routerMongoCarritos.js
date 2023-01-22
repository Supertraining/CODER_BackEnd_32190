const express = require('express');
const MongoCartsContainer = require('../api/MongoDB/mongoCartsDbContainer');
const mongoDbCartContainer = new MongoCartsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);
const router = express.Router();

router.get('/:id/productos', (req, res) => {
	mongoDbCartContainer.getByCartId(req.params.id).then((data) => res.json(data));
});
router.post('/', (req, res) => {
	mongoDbCartContainer.createCart(req.body).then((data) => {
		res.json(data);
	});
});
router.post('/:idCarrito/productos/:idProducto/', (req, res) => {
	mongoDbCartContainer
		.addProduct(req.params.idCarrito, req.params.idProducto)
		.then((data) => res.json(data));
});
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	mongoDbCartContainer.deleteCartById(id).then((data) => res.json(data));
});
router.delete('/:idCarrito/productos/:id_prod', (req, res) => {
	mongoDbCartContainer
		.deleteCartProductById(req.params.idCarrito, req.params.id_prod)
		.then((data) => res.json(data));
});

module.exports = router;