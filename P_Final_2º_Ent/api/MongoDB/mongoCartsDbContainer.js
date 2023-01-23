import mongoose from 'mongoose';
import Cartmodel from '../../models/carts.js';
import Productmodel from '../../models/product.js';

class MongoCartContainer {
	constructor(url) {
		this.url = url;
	}
	async connect() {
		try {
			await mongoose.connect(`${this.url}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log('Base de datos MongDB Atlas conectada');
		} catch (err) {
			console.log('ocurrio un error' + err);
		}
	}

	async createCart(obj) {
		let newCart = new Cartmodel({ timestamp: Date.now(), ...obj });
		try {
			await this.connect();
			await newCart.save();
			return 'El Carrito se ha creado correctamente';
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
	}
	async addProduct(cartId, productId) {
		let data = null;
		try {
			await this.connect();
			let product = await Productmodel.findById(productId);
			data = await Cartmodel.updateOne({ _id: cartId }, { $push: { productos: product } });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.modifiedCount) {
			return `El producto ${productId} se ha añadido correctamente al carrito ${cartId}`;
		} else {
			return 'El productos no ha podido ser añadido';
		}
	}

	async getByCartId(id) {
		let data = null;
		try {
			await this.connect();
			data = await Cartmodel.findById(id);
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (!data) {
			return `El carrito con el ID ${id} no existe`;
		} else if (data.productos.length > 0) {
			return data.productos;
		} else {
			return `El Carrito con el id ${id} esta vacío`;
		}
	}

	async getAll() {
		let data = null;
		try {
			await this.connect();
			data = await Cartmodel.find();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.length > 0) {
			return data;
		} else {
			return 'La colección esta vacía';
		}
	}

	async deleteCartById(id) {
		let data = null;
		try {
			await this.connect();
			data = await Cartmodel.deleteOne({ _id: id });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.deletedCount) {
			return `El carrito ${id} ha sido eliminado`;
		} else {
			return 'El carrito no existe';
		}
	}
	async deleteCartProductById(cartId, productId) {
		let data = null;
		try {
			await this.connect();
			let product = await Productmodel.findById(productId);
			data = await Cartmodel.updateOne({ _id: cartId }, { $pull: { productos: product } });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		} finally {
			mongoose.disconnect();
		}
		if (data.modifiedCount) {
			return `El producto ${productId} ha sido borrado del carrito ${cartId}`;
		} else {
			return 'El productos no ha podido ser borrado';
		}
	}
}

export default MongoCartContainer;
