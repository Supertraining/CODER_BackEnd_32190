import logger from '../Logger/Logger.js';
import { mensajeDTO } from '../DTOs/mensajeDTO.js';

let instance = null;

export default class MessagesDAOdb {

	async save(data, model) {
		try {
			const dataDb = await model.insertMany(data);
			return mensajeDTO(dataDb)

		} catch (err) {
			logger.error(err)
		}
	}

	async getAll(model) {
		let data = null;
		try {
			data = await model.find({}, { _id: 0, __v: 0 });
			return mensajeDTO(data)
		} catch (err) {
			logger.error(err)
			return data = [];
		}
	}

	async getById(id, model) {
		let data = null;
		try {
			data = await model.find({ _id: id });
			return mensajeDTO(data)

		} catch (err) {
			return (data = []);
		}
	}

	async delete(id, model) {
		try {
			const deleted = await model.deleteOne(id);
			return mensajeDTO(deleted)
		} catch {
			logger.error(err)
		}
	}

	async update(obj, model) {
		try {
			const updated = await model.updateOne(obj);
			return mensajeDTO(updated);
		} catch {
			logger.error(err)
		}
	}

	static getInstance() {
		if (!instance) {
			instance = new MessagesDAOdb();
			logger.info('Se ha Creado una nueva instancia de mensajesDAO');
		}
		logger.info('Se ha utilizado una instancia ya creada de  mensajesDAO');
		return instance;
	}
}


