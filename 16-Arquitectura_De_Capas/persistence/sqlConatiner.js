import knex from 'knex';
import { faker } from '@faker-js/faker';
faker.locale = 'es';
import logger from '../Logger/Logger.js';

class SQLContainer {
	constructor(options, tabla) {
		this.knex = knex(options);
		this.tabla = tabla;
	}

	async insertProduct(product) {
		try {
			await this.knex(`${this.tabla}`).insert(product);
		} catch (err) {
			logger.error(err);
		}
	}
	
	async getAll() {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*');
			return data;
		} catch (err) {
			logger.error(err);
			return (data = []);
		}
	}
	async getByID(id) {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*').where('id', '=', id);
			return data;
		} catch (err) {
			logger.error(err);
			return (data = []);
		}
	}

	async delete(id) {
		try {
			await this.knex(`${this.tabla}`).where('id', '=', id).del();
		} catch (err) {
			logger.error(err);
		}
	}

	async update(obj) {
		try {
			await this.knex(`${this.tabla}`)
				.where('id', '=', obj.id)
				.update({ nombre: obj.nombre, precio: obj.precio, foto: obj.foto });
		} catch (err) {
			logger.error(err);
		}
	}
	async close(data) {
		if (data) {
			try {
				await this.knex.destroy();
			} catch (err) {
				logger.error(err);
			}
		}
	}
}

export default SQLContainer;
