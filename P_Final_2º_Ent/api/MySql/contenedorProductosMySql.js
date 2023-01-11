const knex = require('knex');

class ContenedorProductosSQL {
	constructor(options, tabla) {
		this.knex = knex(options);
		this.tabla = tabla;
	}

	async save(productos) {
		try {
			await this.knex(`${this.tabla}`).insert({timestamp: Date.now(), ...productos});
			return 'El producto se ha añadido correctamente';
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
	async getById(id) {
		let data = null;
		try {
			data = await this.knex(`${this.tabla}`).select('*').where('id', '=', id);
		} catch (err) {
			console.log('Ocurrio un error' + err);
		}
		if (data) {
			return data;
		} else {
			return 'El producto no existe';
		}
	}

	async delete(id) {
		try {
			await this.knex(`${this.tabla}`).where('id', '=', id).del();
			return 'producto eliminado';
		} catch (err) {
			throw new Error('ocurrio un error' + err);
		}
	}

	async updateProduct(id, obj) {
		try {
			await this.knex
				.from(`${this.tabla}`)
				.where('id', '=', id)
				.update({ nombre: obj.nombre, precio: obj.precio, foto: obj.foto, descripcion: obj.descripcion, codigo: obj.codigo, stock: obj.stock });
			return 'productos actualizado correctamente';
		} catch (err) {
			throw new Error('ocurrio un error' + err);
		}
	}
	async close(data) {
		if (data) {
			try {
				await this.knex.destroy();
			} catch (err) {
				throw new Error('ocurrio un error' + err);
			}
		}
	}
}

module.exports = { ContenedorProductosSQL };
