const express = require('express');
const { options } = require('../options/mariaDB')
const { ContenedorProductosSQL } = require('../api/MySql/contenedorProductosMySql');
const MySqlDbProductContainer = new ContenedorProductosSQL(options, 'productos');

const app = express();
const router = express.Router();
app.use('/api/MySqlDB/productos', router);

const admin = true;

const isAuthorized = (req, res, next) => {
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/MySqlDB/productos metodo: POST, no autorizada' })
		: next();
};

router.get('/:id?', (req, res) => {
	!req.params.id 
	?MySqlDbProductContainer.getAll().then(data => res.send(data))
	:MySqlDbProductContainer.getById(req.params.id).then(data => res.json(data));
    MySqlDbProductContainer.close();
	});
router.post('/', isAuthorized, (req, res) => {
	MySqlDbProductContainer.save(req.body).then(data => res.json(data))
    MySqlDbProductContainer.close();
});
router.put('/:id', isAuthorized, (req, res) => {
	MySqlDbProductContainer.updateProduct(req.params.id , req.body).then((data) => res.json(data));
    MySqlDbProductContainer.close();
});

router.delete('/:id', isAuthorized, (req, res) => {
	MySqlDbProductContainer.delete(req.params.id).then((data) => res.json(data));
    MySqlDbProductContainer.close();
});

module.exports = router;
