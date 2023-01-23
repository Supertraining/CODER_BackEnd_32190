import mongoose from 'mongoose';
import Productmodel from '../../models/product.js';

class MongoProductsContainer {
	constructor(url) {
		this.url = url;
	}
	async #connect() {
		try {
			await mongoose.connect(`${this.url}`, { useNewUrlParser: true, useUnifiedTopology: true });
			console.log('Base de datos MongDB Atlas conectada');
			return true
		} catch (err) {
			console.log('ocurrio un error' + err);
		}
	}
	async save(obj) {
		let newproduct = new Productmodel({timestamp : Date.now(), ...obj});
		try {
			await this.#connect();
			await newproduct.save();
			return('El producto se ha añadido correctamente')
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
	}

	async getById(id) {
			let data = null;
		try {
			await this.#connect();
			data = await Productmodel.findById(id);
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if(data) {
			return data
		} else {
			return('El producto no existe')
		}
	}
	async updateProduct(id, update) {
		let data = null;
		try {
			await this.#connect();
			data = await Productmodel.updateOne({ _id: id }, { $set: update });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.modifiedCount) {
			return('productos actualizado correctamente')
		} else {
			return('El productos no ha podido ser actualizado')
		}
	}

	async getAll() {
		let data = null;
		try {
			await this.#connect();
			data = await Productmodel.find();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.length > 0 ) {
			return data
		} else {
			return('La colección esta vacía')
		}
	}

	async deleteById(id) {
		let data = null;
		try {
			await this.#connect();
			data = await Productmodel.deleteOne({ _id: id });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.deletedCount) {
			return 'producto eliminado';
		} else {
			return 'El producto no existe';
		}
	}
}

export default MongoProductsContainer;


