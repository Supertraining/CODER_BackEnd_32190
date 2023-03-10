import * as message from '../models/mensaje.js';
import * as user from '../models/user.js';
import bcrypt from 'bcrypt';
import logger from '../Logger/Logger.js';

class MongoContainer {

	async insertMessage(msj) {
		try {
			await message.model.insertMany(msj);
		} catch (err) {
			logger.error(err)
		}
	}

	async getAll() {
		let data = null;
		let db = null;
		try {
			db = await message.model.find({}, { _id: 0, __v: 0 });
			const stringifyData = JSON.stringify(db);
			const parsedData = JSON.parse(stringifyData);

			let newId = 1;
			parsedData.forEach((e) => (e.id = newId++));
			data = { id: 1, mensajes: parsedData };
			return data;
			
		} catch (err) {
			logger.error(err)
		}
	}
	async getMessageByID(id) {
		let data = null;
		try {
			data = await message.model.findById(id);
			return data;
		} catch (err) {
			return (data = []);
		}
	}

	async deleteMessage(id) {
		try {
			await message.model.deleteOne(id);
		} catch {
			logger.error(err)
		}
	}

	async updateMesagge(obj) {
		try {
			await message.model.updateOne(obj);
		} catch {
			logger.error(err)
		}
	}

	async getUser(username) {
		let data = null;
		try {
			data = await user.model.find({ username: username });
			return data[0];
		} catch (err) {
			return (data = null);
		}
	}
	async authHash(username, password) {
		try {
			let data = await this.getUser(username);
			let auth = bcrypt.compare(password, data.password);
			return auth;
		} catch (err) {
			logger.error(err)
		}
	}
	async insertUser(data) {
		
		try {
			const usuario = { username: data.username, password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10), null) };
			await user.model.insertMany(usuario);

			let newUser = data;
			return newUser;
		} catch (err) {
			logger.error(err)
		}
	}
}

export default MongoContainer;
