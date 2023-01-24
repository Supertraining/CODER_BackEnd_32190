import MongoProductsContainer from '../api/MongoDB/mongoProductsDbContainer.js';
const mongoDbProductContainer = new MongoProductsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

export const getProducts = async (req, res) => {
	let data = null;
	!req.params.id
		? (data = await mongoDbProductContainer.getAll())
		: (data = await mongoDbProductContainer.getById(req.params.id));
	res.json(data);
};
export const createProduct = async (req, res) => {
	let data = await mongoDbProductContainer.save(req.body);
	res.json(data);
};
export const updateProduct = async (req, res) => {
	let data = await mongoDbProductContainer.updateProduct(req.params.id, req.body);
	res.json(data);
};
export const deleteProduct = async (req, res) => {
	let data = await mongoDbProductContainer.deleteById(req.params.id);
	res.json(data);
};
export const isAuthorized = (req, res, next) => {
	const admin = true;
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};