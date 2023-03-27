import logger from '../Logger/Logger.js';
import { normalize, schema } from 'normalizr';
import MessageRepo from '../repo/messageRepo.js';


export default class UserAndMessagesService {
    constructor() {
        this.messageService = new MessageRepo();
    }

    async save(data) {
        try {
            const mensaje = await this.messageService.save(data);
            return mensaje;

        } catch (error) {
            logger.error(error)
        }
    }

    async getAll() {
        let data = null;
        try {

            data = await this.messageService.getAll()

            const stringifyData = JSON.stringify(data);
            const parsedData = JSON.parse(stringifyData);

            let newId = 1;
            parsedData.forEach((e) => (e.id = newId++));
            let dataMessages = { id: 1, mensajes: parsedData };

            const authorSchema = new schema.Entity('author', {}, { idAttribute: 'id' });
            const messageSchema = new schema.Entity('message', {
                author: authorSchema,
            });

            const postSchema = new schema.Entity('post', {
                mensajes: [messageSchema],
            });

            const mensajesNormalizados = normalize(dataMessages, postSchema)

            return mensajesNormalizados;

        } catch (error) {
            logger.error(error)
            return data = [];
        }
    }

    async getById(id) {
        let data = null;
        try {
            data = await this.messageService.getById(id);
            return data;
        } catch (err) {
            return (data = null);
        }
    }

    async delete(id) {
        try {
            const deleted = await this.messageService.delete(id);
            return deleted;
        } catch {
            logger.error(err)
        }
    }

    async update(obj) {
        try {
            const updated = await this.messageService.update(obj);
            return updated;
        } catch {
            logger.error(err)
        }
    }
}

