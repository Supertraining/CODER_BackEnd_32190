const express = require('express');
const contenedorDeProductos = require('../api/contenedorDeProd');

const contenedorLocalProductos = new contenedorDeProductos('../persistencia/productos.txt')


const app = express();
const router = express.Router();

const admin = true;

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};

router.get('/:id?', (req, res) => {
	!req.params.id 
	?contenedorLocalProductos.getAll().then(data => res.send(data))
	:contenedorLocalProductos.getById(+req.params.id).then(data => res.json(data));
	});
router.post('/', isAuthorized, (req, res) => {
	contenedorLocalProductos.save(req.body);
	res.redirect('/productos');
});
router.put('/:id', isAuthorized, (req, res) => {
	contenedorLocalProductos.updateProduct(+req.params.id , req.body).then((data) => res.json(data));
});

router.delete('/:id', isAuthorized, (req, res) => {
	contenedorLocalProductos.deleteById(+req.params.id).then((data) => res.json(data));
});

module.exports = router;
