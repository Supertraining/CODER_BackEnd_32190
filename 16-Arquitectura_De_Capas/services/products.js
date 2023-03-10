import { options } from '../config/config.js';
import logger from '../Logger/Logger.js';
import SQLContainer from '../persistence/sqlConatiner.js';
const productsContainer = new SQLContainer(options, 'productos');

export const getProducts = async () => {
    try {
        return await productsContainer.getAll();
    } catch (error) {
        logger.error(error);
    }
}

export const save = async (product) => {
    try {
        return await productsContainer.insertProduct(product);
    } catch (error) {
        logger.error(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        return await productsContainer.delete(id);
    } catch (error) {
        logger.error(error);
    }
}

export const updateProduct = async (product) => {
    try {
        return await productsContainer.update(product);
    } catch (error) {
        logger.error(error);
    }
}

export const getProduct = async (id) => {
    try {
        return await productsContainer.getByID(id);
    } catch (error) {
        logger.error(error);
    }
}