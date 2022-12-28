const express = require('express');
const FirebaseCartsContainer = require('../api/Firebase/firebaseCartsContainer');
const firebaseDbCartsContainer = new FirebaseCartsContainer();

const app = express();
const router = express.Router();
app.use('/api/firebase/carritos', router);

router.get('/:id/productos', (req, res) => {
	firebaseDbCartsContainer.getByCartId(req.params.id).then((data) => res.json(data));
});
router.post('/', (req, res) => {
	firebaseDbCartsContainer.createCart(req.body).then((data) => {
		res.json(data);
	});
});
router.post('/:idCarrito/productos/:idProducto/', (req, res) => {
	firebaseDbCartsContainer
		.addProduct(req.params.idCarrito, req.params.idProducto)
		.then((data) => res.json(data));
});
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	firebaseDbCartsContainer.deleteCartById(id).then((data) => res.json(data));
});
router.delete('/:idCarrito/productos/:id_prod', (req, res) => {
	firebaseDbCartsContainer
		.deleteCartProductById(req.params.idCarrito, req.params.id_prod)
		.then((data) => res.json(data));
});

module.exports = router;
