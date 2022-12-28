const db = require('./firebaseInit')

class FirebaseProductsContainer {
	constructor() {
		this.queryProducts = db.collection('productos')
		
	}
	async getById(id) {
		let data = null;
		let dataC = null;
		try {
			data = await this.this.queryProductsProducts.doc(id).get();
			dataC = data.data();
			dataC = { id: data.id, ...dataC };
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data.data()) {
			return dataC;
		} else {
			return 'El producto no existe';
		}
	}
	async updateProduct(id, update) {
		let data = null;
		try {
			data = await this.this.queryProductsProducts.doc(id).update(update);
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data) {
			return 'productos actualizado correctamente';
		} else {
			return 'El productos no ha podido ser actualizado';
		}
	}
	async save(obj) {
		let data = null;
		console.log(obj);
		if (!obj) {
			return 'Debe al menos ingresar un producto para poder ser ingresado';
		} 
		try {
			data = await this.queryProducts.add(obj);
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data._path.segments) {
			return 'El producto se ha añadido correctamente';
		} else {
			return 'El producto no se ha podido añadir';
		}
	}
	async getAll() {
		let data = [];
		try {
			const collection = await this.queryProducts.get();
			collection.forEach((el) => {
				data.push({id :el.id, ...el.data()});
			});
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data.length > 0) {
			return data;
		} else {
			return 'La colección esta vacía';
		}
	}

	async deleteById(id) {
		let data = null;
		try {
			data = await this.queryProducts.doc(id).get();
			await this.queryProducts.doc(data.id).delete();
		} catch (err) {
			console.log(`Ocurrio un error ${err}`);
		}
		if (data.data()) {
			return 'producto eliminado';
		} else {
			return 'El producto no existe';
		}
	}
}

module.exports = FirebaseProductsContainer;
