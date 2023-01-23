import * as fs from 'fs';

class ContenedorLocalProductos {
	constructor(path) {
		this.path = path;
	}
	
	async save(obj) {
		let newProducto = null;
		let id = 0;
		let data = await this.getAll();
		let newData = JSON.parse(data);
		if (newData.length == 0) {
			id = 1;
			try {
				await fs.promises.writeFile(
				`${this.path}`,
				JSON.stringify([{ ...obj, id: id, timestamp: Date.now() }])
			);
				return id;
			} catch (err) {
				return ('Ocurrio un error' + err);
			}
			
		} 
		else {
			newProducto = JSON.parse(data);
			id = newProducto[newProducto.length - 1].id + 1;
			newProducto.push({ ...obj, timestamp: Date.now(), id: id });
		}
		try {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(newProducto));
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
		const index = newProducto.length - 1;
		return newProducto[index].id;
	}

	async getById(n) {
		let data = await this.getAll();
		const newData = JSON.parse(data);
		const exists = newData.find((e) => e.id === n);
		return(exists)
		? (exists)
		: { error: 'el producto no existe' };
		}
	async updateProduct(id, obj) {
		let data = await this.getAll();
		let listaProductos = null;
		let exists = JSON.parse(data).find((e) => e.id === id);
		if (!exists) {
			return { error: 'el producto no existe' };
		} 
			listaProductos = JSON.parse(data);
			let index = listaProductos.findIndex(prod => prod.id === id)
			listaProductos[index] = { ...obj, id: id, timestamp: Date.now() };
			
		
		try {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(listaProductos));
			console.log('Producto actualizado con éxito')
			return listaProductos[index]
				
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
			
	}

	async getAll() {
		let data = null;
		try {
			data = await fs.promises.readFile(`${this.path}`, 'utf-8');
			return JSON.parse(data) 
		} catch (err) {
			return (data = []);
		}
	}

	async deleteById(n) {
		let data = await this.getAll();
		const newData = JSON.parse(data);
		const exists = newData.find((e) => e.id === n);
		if (!exists) {
			return 'No existe el producto';
		}
		const resultado = newData.filter((e) => e.id !== n);
		try {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(resultado));
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
		return { mensaje: 'producto eliminado' };
	}
}

export default ContenedorLocalProductos;
