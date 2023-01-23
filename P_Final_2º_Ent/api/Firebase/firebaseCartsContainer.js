import db from './firebaseInit.js';

class FirebaseCartsContainer {
	constructor() {
		this.queryCarts = db.collection('carritos'),
		this.queryProducts = db.collection('productos')
		
	}
	async createCart() {
		let data = null;
		let newCart = null;
		try {
			data = await this.queryCarts.add({
				timestamp: Date.now(),
				productos: [],
			});
			let newCartId = data._path.segments[1];
			newCart = await this.queryCarts.doc(newCartId).get();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		return {id : newCart.id, ...newCart.data()};
	}
	async addProduct(cartId, productId) {
		let cart = null,
			cartP = null,
			product = null,
			productoWithId = null;
		try {
			cart = await this.queryCarts.doc(cartId).get();
			product = await this.queryProducts.doc(productId).get();
			productoWithId = { id: product.id, ...product.data() };
			cartP = await cart.data().productos;
			cartP.push(productoWithId);
			cart = await this.queryCarts.doc(cartId).set({ productos: cartP }, { merge: true });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (cart) {
			return 'producto añadido al carrito correctamente';
		} else {
			return 'El producto no ha podido ser añadido';
		}
	}

	async getByCartId(id) {
		let data = null;
		try {
			data = await this.queryCarts.doc(id).get();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data.data().productos.length >= 1) {
			return data.data().productos;
		} else {
			return 'El carrito esta vacio';
		}
	}
	async getAllCarts() {
		let data = [];
		let collection = null;
		try {
			collection = await this.queryCarts.get();
			collection.forEach((el) => {
				data.push(el.data());
			});
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (collection) {
			return data;
		} else {
			return 'La colección esta vacía';
		}
	}

	async deleteCartById(id) {
		let data = null;
		try {
			data = await this.queryCarts.doc(id).get();
			await this.queryCarts.doc(data.id).delete();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data.data()) {
			return `Carrito ${data.id} eliminado`;
		} else {
			return 'El carrito no existe';
		}
	}
	async deleteCartProductById(cartId, productId) {
		if (!cartId && !productId) {
			return 'Debe ingresar el id del carrito y del producto para poder ser añadido';
		}
		let cart = null,
			cartP = null;
		try {
			cart = await this.queryCarts.doc(cartId).get();
			cartP = cart.data().productos;
			let updatedCartP = cartP.filter((e) => e.id != productId);
			cart = await this.queryCarts.doc(cartId).set({ productos: updatedCartP }, { merge: true });
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (cart) {
			return 'producto eliminado del carrito correctamente';
		} else {
			return 'El producto no ha podido ser eliminado';
		}
	}
}

export default FirebaseCartsContainer;
