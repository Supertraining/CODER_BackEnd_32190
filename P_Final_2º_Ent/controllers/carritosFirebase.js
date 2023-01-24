import FirebaseCartsContainer from '../api/Firebase/firebaseCartsContainer.js';
const firebaseDbCartsContainer = new FirebaseCartsContainer();

export const getCartProducts = async (req, res) => {
	let data = await firebaseDbCartsContainer.getByCartId(req.params.id);
	res.json(data);
};
export const createCart = async (req, res) => {
    let data = await firebaseDbCartsContainer.createCart(req.body)
		res.json(data);
};
export const addProductToCart = async (req, res) => {
    let data = await firebaseDbCartsContainer
		.addProduct(req.params.idCarrito, req.params.idProducto)
		res.json(data);
};
export const deleteCart = async (req, res) => {
    const id = req.params.id;
	let data = await firebaseDbCartsContainer.deleteCartById(id)
	res.json(data);
};
export const deleteProductFromCart = async (req, res) => {
	let data = await firebaseDbCartsContainer
		.deleteCartProductById(req.params.idCarrito, req.params.id_prod)
		res.json(data);
};
