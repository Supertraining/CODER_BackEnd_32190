import logger from '../Logger/Logger.js';
import { normalize, schema } from 'normalizr';
import MongoContainer from '../persistence/mongoContainer.js';
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