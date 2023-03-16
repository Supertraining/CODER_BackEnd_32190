import io from '../server.js';
import * as services from '../services/sockets.js';
import logger from '../Logger/Logger.js';


const getAllProducts = async () => {
	try {
		let productos = await services.getProducts();
		return productos;
	} catch (error) {
		logger.error(error)
	}
};

const saveProduct = async (product) => {
	try {
		await services.save(product);
		let productos = await services.getProducts('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		logger.error(error)
	}
};

const deleteProductById = async (id) => {
	try {
		await services.deleteProduct(id);
		let productos = await services.getProducts('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		logger.error(error)
	}
};

const updateByProduct = async (product) => {
	try {
		await services.updateProduct(product);
		let productos = await productContainer.getAll('productos');
		io.sockets.emit('productos', productos);
	} catch (error) {
		logger.error(error)
	}
};

const getProductByID = async (id) => {
	try {
		let producto = await services.getProduct(id);
		io.sockets.emit('selectedProd', producto);
	} catch (error) {
		logger.error(error)
	}
};


const newMessages = async (data) => {
	try {
		await services.addMessage(data);
		let messages = services.getAllNormalized;
		io.sockets.emit('normalizedMessages', messages);
	} catch (err) {
		logger.error(err);
	}
};

const getAllMessages = async () => {
	try {
		let messages = await services.getAllNormalized();
		return messages;
	} catch (err) {
		logger.error(err);
	}
}

export const sockets = async (Socket) => {
	console.log('Nuevo usuario conectado');

	let productos = await getAllProducts();

	Socket.emit('productos', productos);

	Socket.on('new-product', saveProduct);

	Socket.on('deleteProduct', deleteProductById);

	Socket.on('updatedProduct', updateByProduct);

	Socket.on('selectedProduct', getProductByID);

	Socket.on('new-message', newMessages);

	let messages = await getAllMessages();

	Socket.emit('normalizedMessages', messages);
}