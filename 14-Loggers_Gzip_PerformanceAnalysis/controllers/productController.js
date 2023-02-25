import ClienteSQL from '../api/sqlConatiner.js';
import { options } from '../options/mariaDB.js';
import io from '../server.js';

const productContainer = new ClienteSQL(options, 'productos');

export const getAllProducts = async () => {
	try {
		let productos = await productContainer.getAll('productos');
		return productos;
	} catch (error) {
		console.log(error);
	}
};

export const insertProduct = async (data) => {
	try {
		await productContainer.insertarProductos(data);
		let productos = await productContainer.getAll('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id) => {
	try {
		await productContainer.deleteProduct(id);
		let productos = await productContainer.getAll('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		console.log(error);
	}
};

export const updateProduct = async (data) => {
	try {
		await productContainer.updatedProduct(data);
		let productos = await productContainer.getAll('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		console.log(error);
	}
};

export const selectProduct = async (id) => {
	try {
		let producto = await productContainer.getProductByID(id);
		io.sockets.emit('selectedProd', producto);
	} catch (error) {
		console.log(error);
	}
};

export const getFakerProducts = async (req, res, next) => {
	try {
		let fproducts = await productContainer.fakerProducts();
		res.render('fakeproducts', { fproducts: fproducts });
	} catch (error) {
		console.log(error);
	}
	next()
};
