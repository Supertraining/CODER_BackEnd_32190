import DAOFactory from "../DAOs/DAOFactory.js";
import Producto from "../modelos/producto.js";

export default class ProductRepo {
	dao
	prod
	constructor() {
		this.dao = DAOFactory.getDao()
		this.prod = this.dao.prodDAO
	}

	async save(product) {
		try {
			const productId = await this.prod.save(product);
			return productId;
		} catch (err) {
			logger.error(err);
		}
	}

	async getAll() {
		let data = null;
		try {

			data = await this.prod.getAll()
			
			return data.map(p => new Producto(p).datos())

		} catch (err) {
			logger.error(err);
			return (data = []);
		}
	}
	async getById(id) {
		let data = null;
		try {
			data = await this.prod.getById(id)
			return data.map(p => new Producto(p).datos());
		} catch (err) {
			logger.error(err);
			return (data = []);
		}
	}

	async delete(id) {
		try {
			const deleted = await this.prod.delete(id)
			return deleted
		} catch (err) {
			logger.error(err);
		}
	}

	async update(obj) {
		try {
			const updated = await this.prod.update(obj)
			return new Producto(updated[ 0 ]).datos();
		} catch (err) {
			logger.error(err);
		}
	}
}
