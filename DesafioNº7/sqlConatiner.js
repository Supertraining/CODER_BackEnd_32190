const knex = require('knex');

class ClienteSQL {
	constructor(options, tabla) {
		this.knex = knex(options);
		this.tabla = tabla;
	}

	insertarProductos(productos) {
		return this.knex(`${this.tabla}`)
			.insert(productos)
			.then(() => console.log('data inserted'))
			.catch((err) => {
				console.log(err);
				throw err;
			});
	}

	async getAll() {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*');
			return data;
		} catch (err) {
			console.log('error');
			return (data = []);
		}
	}
	getProductByID(id) {
		return this.knex(`${this.tabla}`).select('*').where('id', '=', id);
	}

	async deleteProduct(id) {
		try {
			await this.knex(`${this.tabla}`)
				.where('id', '=', id)
				.del()
				.then(() => console.log('Product deleted'))
				.catch((err) => {
					console.log(err);
					throw err;
				});
		} catch {
			throw new Error('ocurrio un error' + err);
		}
	}

	async updatedProduct(obj) {
		try {
			await this.knex
				.from(`${this.tabla}`)
				.where('id', '=', obj.id)
				.update({ nombre: obj.nombre, precio: obj.precio, imagen: obj.imagen })
				.then(() => console.log('producto actualizado'))
				.catch((err) => {
					console.log(err);
					throw err;
				});
		} catch {
			throw new Error('ocurrio un error' + err);
		}
	}
}

module.exports = { ClienteSQL };
