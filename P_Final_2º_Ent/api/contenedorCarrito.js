import fs from 'fs';

class ContenedorLocalCarritos {
	constructor(path) {
		this.path = path;
	}

	async createCart() {
		let newCarrito = null;
		let id = 0;
		let data = await this.getAll();
		if (data == 0) {
			id = 1;
			data.push({
				id: id,
				timestamp: Date.now(),
				productos: [],
			});
			try {
				await fs.promises.writeFile(`${this.path}`, JSON.stringify(data));
			} catch (err) {
				throw new Error('Ocurrio un error' + err);
			}
			return id;
		} else {
			newCarrito = JSON.parse(data);
			id = newCarrito[newCarrito.length - 1].id + 1;
			newCarrito.push({
				id: id,
				timestamp: Date.now(),
				productos: [],
			});
		}
		try {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(newCarrito));
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
		const index = newCarrito.length - 1;
		return newCarrito[index].id;
	}
	async addProduct(idCarrito, idProducto) {
		let dataCarts = await this.getAll();
		let allCarts = JSON.parse(dataCarts);
		let selectedCart = allCarts.find((e) => e.id === idCarrito);
		if (!selectedCart) {
			return { error: 'el carrito no existe' };
		}
		let dataProducts = await fs.promises.readFile('./persistencia/productos.txt', 'utf-8');
		let allProducts = JSON.parse(dataProducts);
		let selectedProduct = allProducts.find((e) => e.id === idProducto);
		if (!selectedProduct) {
			return { error: 'el producto no existe' };
		}
		selectedCart.productos.push(selectedProduct);
		allCarts[allCarts.indexOf(selectedCart)] = selectedCart;
		try {
			await fs.promises.writeFile(
				'./persistencia/carritos.txt',
				JSON.stringify(allCarts),
				'utf-8'
			);
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
		return { mensaje: 'Producto agregado con exito' };
	}

	async getByCartId(n) {
		let data = await this.getAll();
		const newData = JSON.parse(data);
		const exists = newData.find((e) => e.id === n);
		return !exists
			? { error: 'El carrito no existe' }
			: exists.productos.length === 0
			? { mensaje: 'El carrito esta vacio' }
			: exists.productos;
	}

	async getAll() {
		let data = null;
		try {
			data = await fs.promises.readFile(`${this.path}`, 'utf-8');
			return data;
		} catch (err) {
			return (data = []);
		}
	}

	async deleteCartById(n) {
		let data = await this.getAll();
		const newData = JSON.parse(data);
		const exists = newData.find((e) => e.id === n);
		if (!exists) {
			return { error: 'El carrito seleccionado no existe' };
		}
		const resultado = newData.filter((e) => e.id !== n);
		if (resultado.length > 0) {
			try {
				await fs.promises.writeFile(`${this.path}`, JSON.stringify(resultado));
			} catch (err) {
				throw new Error('Ocurrio un error');
			}
			return resultado;
		} else {
			try {
				await fs.promises.unlink(`${this.path}`)
			} catch {
				throw new Error('Ocurrio un error');
			}
			return { mensaje: 'se eliminaron todos los carritos' };
		}
	}
	async deleteCartProductById(idCarrito, idProducto) {
		let data = await this.getAll();
		const allCarts = JSON.parse(data);
		const selectedCart = allCarts.find((cart) => cart.id === idCarrito);
		if (!selectedCart) {
			return { error: 'el carrito no existe' };
		}
		const selectedProduct = selectedCart.productos.find((e) => e.id === idProducto);
		if (!selectedProduct) {
			return { error: 'el producto no existe' };
		}
		const updatedProducts = selectedCart.productos.filter((e) => e.id !== idProducto);
		selectedCart.productos = updatedProducts;
		allCarts[allCarts.indexOf(selectedCart)] = selectedCart;
		try {
			await fs.promises.writeFile(
				'./persistencia/carritos.txt',
				JSON.stringify(allCarts),
				'utf-8'
			);
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
		return { mensaje: 'producto eliminado' };
	}
}

export default ContenedorLocalCarritos 
