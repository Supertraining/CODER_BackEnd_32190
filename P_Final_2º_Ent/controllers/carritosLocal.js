import contenedorCarritoLocal from '../api/contenedorCarrito.js';

const contenedorCarrito = new contenedorCarritoLocal('./persistencia/carritos.txt');

export const createCart = async (req, res) => {
	let data = await contenedorCarrito.createCart(req.body);
	res.json(data);
};
export const getCartsProducts = async (req, res) => {
	let data = await contenedorCarrito.getByCartId(+req.params.id);
	res.json(data);
};
export const addProductToCart = async (req, res) => {
	let data = await contenedorCarrito.addProduct(+req.params.idCarrito, +req.params.idProducto);
	res.json(data);
};
export const deleteCart = async (req, res) => {
	const id = +req.params.id;
	let data = await contenedorCarrito.deleteCartById(id);
	res.json(data);
};
export const deleteProductFromCart = async (req, res) => {
	let data = await contenedorCarrito.deleteCartProductById(
		+req.params.idCarrito,
		+req.params.id_prod
	);
	res.json(data);
};
