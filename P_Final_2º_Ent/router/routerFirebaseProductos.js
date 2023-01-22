const express = require('express');
const FirebaseProductsContainer = require('../api/Firebase/firebaseProductsConatiner');
const firebaseDbProductContainer = new FirebaseProductsContainer('../../firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.json');

const app = express();
const router = express.Router();

const admin = true;

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/Firebase/productos metodo: POST, no autorizada' })
		: next();
};

router.get('/:id?', (req, res) => {
	!req.params.id 
	?firebaseDbProductContainer.getAll().then(data => res.send(data))
	:firebaseDbProductContainer.getById(req.params.id).then(data => res.json(data));
	});
router.post('/', isAuthorized, (req, res) => {
	firebaseDbProductContainer.save(req.body).then(data => res.send(data))
});
router.put('/:id', isAuthorized, (req, res) => {
	firebaseDbProductContainer.updateProduct(req.params.id , req.body).then((data) => res.json(data));
});

router.delete('/:id', isAuthorized, (req, res) => {
	firebaseDbProductContainer.deleteById(req.params.id).then((data) => res.json(data));
});

module.exports = router;
