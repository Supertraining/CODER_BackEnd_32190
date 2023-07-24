import logger from '../Logger/Logger.js';
import usuarioDTO from '../DTOs/usuarioDTO.js';
import * as config from '../config/config.js';
import { dbConnection } from '../utils/mongoDbConnection.js';


let instance = null;

class UsersDAO {
	constructor() {

		if (!instance) {
			instance = this;
			logger.info('Se ha Creado una nueva instancia de UsersDAO');
			dbConnection(config.mongoURL);
		}
		logger.info('Se ha utilizado una instancia ya creada de UsersDAO');
		return instance;
	}
	save = async (data, model) => {
		try {

			const dataDb = await model.insertMany(data);

			return usuarioDTO(dataDb)

		} catch (err) {
			logger.error(err)
		}
	}

	async getAll(model) {
		let data = null;
		try {
			data = await model.find({}, { _id: 0, __v: 0 });
			return usuarioDTO(data)

		} catch (err) {
			logger.error(err)
			return data = [];
		}
	}

	async getById(id, model) {
		let data = null;
		try {
			data = await model.find({ username: id });
			return usuarioDTO(data)
		} catch (err) {
			logger.error(err)
		}
	}

	async delete(id, model) {
		try {
			const deleted = await model.deleteOne(id);
			return usuarioDTO(deleted)
		} catch {
			logger.error(err)
		}
	}

	async update(obj, model) {
		try {
			const updated = await model.updateOne(obj);
			return usuarioDTO(updated)
		} catch {
			logger.error(err)
		}
	}
}

export default UsersDAO;
