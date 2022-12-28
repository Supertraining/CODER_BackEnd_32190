const express = require('express');
const MongoProductsContainer = require('../api/MongoDB/mongoProductsDbContainer');
const mongoDbProductContainer = new MongoProductsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);
const app = express();
const router = express.Router();
app.use('/api/MongoDB/productos', router);

const admin = true;

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/MongoDB/productos metodo: POST, no autorizada' })
		: next();
};

router.get('/:id?', (req, res) => {
	!req.params.id 
	?mongoDbProductContainer.getAll().then(data => res.send(data))
	:mongoDbProductContainer.getById(req.params.id).then(data => res.json(data));
	});
router.post('/', isAuthorized, (req, res) => {
    mongoDbProductContainer.connect()
	mongoDbProductContainer.save(req.body).then(data => res.send(data))
	res.redirect('/productos');
});
router.put('/:id', isAuthorized, (req, res) => {
	mongoDbProductContainer.updateProduct(req.params.id , req.body).then((data) => res.json(data));
});

router.delete('/:id', isAuthorized, (req, res) => {
	mongoDbProductContainer.deleteById(req.params.id).then((data) => res.json(data));
});

module.exports = router;
