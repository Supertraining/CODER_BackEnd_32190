import MongoCartsContainer from '../api/MongoDB/mongoCartsDbContainer.js';
const mongoDbCartContainer = new MongoCartsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

export const getCartProducts = async (req, res) => {
	let data = await mongoDbCartContainer.getByCartId(req.params.id);
	res.json(data);
};
export const createCart = async (req, res) => {
	let data = await mongoDbCartContainer.createCart(req.body);
	res.json(data);
};
export const addProductToCart = async (req, res) => {
	let data = await mongoDbCartContainer.addProduct(req.params.idCarrito, req.params.idProducto);
	res.json(data);
};
export const deleteCart = async (req, res) => {
	const id = req.params.id;
	let data = await mongoDbCartContainer.deleteCartById(id);
	res.json(data);
};
export const deleteProductFromCart = async (req, res) => {
	let data = await mongoDbCartContainer.deleteCartProductById(
		req.params.idCarrito,
		req.params.id_prod
	);
	res.json(data);
};
