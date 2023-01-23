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
    firebaseDbCartsContainer
		.addProduct(req.params.idCarrito, req.params.idProducto)
		.then((data) => res.json(data));
};
export const deleteCart = async (req, res) => {
    const id = req.params.id;
	firebaseDbCartsContainer.deleteCartById(id).then((data) => res.json(data));
};
export const deleteProductFromCart = async (req, res) => {
    firebaseDbCartsContainer
		.deleteCartProductById(req.params.idCarrito, req.params.id_prod)
		.then((data) => res.json(data));
};
