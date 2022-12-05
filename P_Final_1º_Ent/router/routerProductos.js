const express = require('express');
const contenedorDeProductos = require('../api/contenedorDeProd.js');

const app = express();

const router = express.Router();
app.use('/api/productos', router);

const admin = true;

router.get('/:id?', (req, res) => {
	if (!req.params.id) {
		contenedorDeProductos
		.getAll()
		.then((data) => {
			res.send(data);
		});
	} else {
		contenedorDeProductos
		.getById(+req.params.id)
		.then((data) => res.json(data));
	}
});
router.post('/', (req, res) => {

	if (!admin) {
		res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' });
	} else {
		contenedorDeProductos
		.save(req.body)
			res.redirect('/') 
		
	}
	
});
router.put('/:id', (req, res) => {
	if (!admin) {
		res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' });
	} else {
		const id = +req.params.id;
		contenedorDeProductos
		.updateProduct(id, req.body)
		.then((data) => res.json(data));
	}
});

router.delete('/:id', (req, res) => {
	if (!admin) {
		res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' });
	} else {
		const id = +req.params.id;
		contenedorDeProductos
		.deleteById(id)
		.then((data) => res.json(data));
	}
});

module.exports = router;
