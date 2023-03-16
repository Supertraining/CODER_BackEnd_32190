import logger from '../Logger/Logger.js';
import { normalize, schema } from 'normalizr';
import MongoContainer from '../persistence/mongoContainer.js';
import SQLContainer from '../persistence/sqlConatiner.js';
import { options } from '../config/config.js';

const productsContainer = new SQLContainer(options, 'productos');
const messageContainer = new MongoContainer();

export const addMessage = async (data) => {
    try {
         return await messageContainer.insertMessage(data);
    } catch (error) {
        logger.error(error)
    }
}

export const getAllNormalized = async () => {
    try {
        let data = await messageContainer.getAll()
        const authorSchema = new schema.Entity('author', {}, { idAttribute: 'id' });
			const messageSchema = new schema.Entity('message', {
				author: authorSchema,
			});
			const postSchema = new schema.Entity('post', {
				mensajes: [messageSchema],
			});
			const mensajesNormalizados = normalize(data, postSchema);
            return mensajesNormalizados;
        
    } catch (error) {
			return (data = []);
    }
}

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