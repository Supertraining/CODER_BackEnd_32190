const knex = require('knex');

class ClienteSQL {
	constructor(options, tabla) {
		this.knex = knex(options);
		this.tabla = tabla;
	}

	async insertarProductos(productos) {
		try {
			await this.knex(`${this.tabla}`)
				.insert(productos);
		} catch (err) {
			console.log('Ocurrio un error' + err);
		} 
	}

	async getAll() {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*');
			return data;
		} catch (err) {
			console.log('Ocurrio error' + err);
			return (data = []);
		} 
	}
	async getProductByID(id) {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*').where('id', '=', id);
			return data;
		} catch(err) {
			console.log('Ocurrio un error' + err);
			return (data = []);
		}
		
	}

	async deleteProduct(id) {
		try {
			await this.knex(`${this.tabla}`)
				.where('id', '=', id)
				.del();
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
		} catch {
			throw new Error('ocurrio un error' + err);
		}
	}
	async close(data) {
		if(data) {
		try {
			await this.knex
			.destroy()
		} catch {
			throw new Error('ocurrio un error' + err);
		} 	
		}
	}
}

module.exports = { ClienteSQL };
