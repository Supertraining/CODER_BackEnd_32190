const express = require('express');
const contenedorDeProductos = require('../api/contenedorDeProd.js');

const app = express();

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};

const router = express.Router();
app.use('/api/productos', router);

const admin = true;

router.get('/:id?', (req, res) => {
	!req.params.id 
	?contenedorDeProductos.getAll().then(data => res.send(data))
	:contenedorDeProductos.getById(+req.params.id).then(data => res.json(data));
	});
router.post('/', isAuthorized, (req, res) => {
	contenedorDeProductos.save(req.body);
	res.redirect('/productos');
});
router.put('/:id', isAuthorized, (req, res) => {
	contenedorDeProductos.updateProduct(+req.params.id , req.body).then((data) => res.json(data));
});

router.delete('/:id', isAuthorized, (req, res) => {
	contenedorDeProductos.deleteById(+req.params.id).then((data) => res.json(data));
});

module.exports = router;
