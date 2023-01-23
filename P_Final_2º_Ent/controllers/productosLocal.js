import contenedorDeProductos from '../api/contenedorDeProd.js';

const contenedorLocalProductos = new contenedorDeProductos('./persistencia/productos.txt');

export const getProducts = async (req, res) => {
	let data = null;
	!req.params.id
		? (data = await contenedorLocalProductos.getAll())
		: (data = await contenedorLocalProductos.getById(+req.params.id));
	res.json(data);
};
export const createProduct = async (req, res) => {
	let data = await contenedorLocalProductos.save(req.body);
	res.json(data);
};
export const updateProduct = async (req, res) => {
	let data = await contenedorLocalProductos.updateProduct(+req.params.id, req.body);
	res.json(data);
};
export const deleteProduct = async (req, res) => {
	let data = await contenedorLocalProductos.deleteById(+req.params.id);
	res.json(data);
};
export const isAuthorized = (req, res, next) => {
	const admin = true;
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};
