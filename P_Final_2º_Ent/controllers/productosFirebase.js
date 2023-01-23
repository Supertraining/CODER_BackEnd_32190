import FirebaseProductsContainer from '../api/Firebase/firebaseProductsConatiner.js';
const firebaseDbProductContainer = new FirebaseProductsContainer(
	'../../firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.json'
);

export const getProducts = async (req, res) => {
	let data = null;
	!req.params.id
		? (data = await firebaseDbProductContainer.getAll())
		: (data = await firebaseDbProductContainer.getById(req.params.id));
	res.json(data);
};
export const createProduct = async (req, res) => {
	let data = await firebaseDbProductContainer.save(req.body);
	res.json(data);
};
export const updateProduct = async (req, res) => {
	let data = await firebaseDbProductContainer.updateProduct(req.params.id, req.body);
	res.json(data);
};
export const deleteProduct = async (req, res) => {
	let data = await firebaseDbProductContainer.deleteById(req.params.id);
	res.json(data);
};
export const isAuthorized = (req, res, next) => {
	const admin = true;
	!admin
		? res.json({ error: -1, descripcion: 'ruta: /api/productos metodo: POST, no autorizada' })
		: next();
};
