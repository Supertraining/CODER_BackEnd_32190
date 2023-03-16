// import io from '../server.js';
// import logger from '../Logger/Logger.js';
// import * as services from '../services/products.js';


// export const getAllProducts = async () => {
// 	try {
// 		let productos = await services.getProducts();
// 		return productos;
// 	} catch (error) {
// 		logger.error(error)
// 	}
// };

// export const saveProduct = async (product) => {
// 	try {
// 		await services.save(product);
// 		let productos = await services.getProducts('productos');
// 		io.sockets.emit('productos', productos);
// 	} catch (error) {
// 		logger.error(error)
// 	}
// };

// export const deleteProductById = async (id) => {
// 	try {
// 		await services.deleteProduct(id);
// 		let productos = await services.getProducts('productos');
// 		io.sockets.emit('productos', productos);
// 	} catch (error) {
// 		logger.error(error)
// 	}
// };

// export const updateByProduct = async (product) => {
// 	try {
// 		await services.updateProduct(product);
// 		let productos = await productContainer.getAll('productos');
// 		io.sockets.emit('productos', productos);
// 	} catch (error) {
// 		logger.error(error)
// 	}
// };

// export const getProductByID = async (id) => {
// 	try {
// 		let producto = await services.getProduct(id);
// 		io.sockets.emit('selectedProd', producto);
// 	} catch (error) {
// 		logger.error(error)
// 	}
// };




