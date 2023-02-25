const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const productos = [];

const router = express.Router();
app.use('/api/productos', router);

router.get('/', (req, res) => {
	res.json(productos);
});
router.get('/:id', (req, res) => {
    const id = +req.params.id;
    const exist = productos.find(e => e.id === id);
	if (!exist) {
		res.json({ error: 'producto no encontrado' });
	}
		res.json(productos[id - 1]);
});

router.post('/', (req, res) => {
	productos.push({ ...req.body, id: productos.length + 1 });
	res.json(productos[productos.length - 1]);
});

router.put('/:id', (req, res) => {
	const id = +req.params.id;
    const exist = productos.find(e => e.id === id);
	if (!exist) {
		res.json({ error: 'producto no encontrado' });
	}else {
		productos[id - 1] = { ...req.body, id: id };
		res.json(productos);
	}
	
});

router.delete('/:id', (req, res) => {
	const id = +req.params.id;
    const exist = productos.find(e => e.id === id);
	if (!exist) {
		res.json({ error: 'producto no encontrado' });
	}else {
		let idx = productos.indexOf(exist)
    	productos.splice(idx, 1);
		res.json(productos);	
	}
});

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${server.address().port}`);
});
