const fs = require('fs');

class contenedor {
	constructor(path) {
		this.path = path;
	}

	async save(obj) {
		let newProducto = null;
		let id = 0;
		let data = await this.getAll();

		if (data.length === 0) {
			id = 1;
			await fs.promises.writeFile(`${this.path}`, JSON.stringify([{ ...obj, id: id }]));
			return id;
		} else {
			newProducto = JSON.parse(data);
			id = newProducto[newProducto.length - 1].id + 1;
			newProducto.push({ ...obj, id: id });
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
		const resultado = newData.find((e) => e.id === n);
		if (resultado) {
			return resultado;
		} else {
			return null;
		}
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

	async deleteById(n) {
		let data = await this.getAll();
		const newProductos = JSON.parse(data);
		if (n < 1 || n > newProductos.length) {
			throw new Error('No existe el producto');
		}
		const resultado = newProductos.filter((e) => e.id !== n);
		try {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify(resultado));
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(`${this.path}`, '');
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}
}

const data = new contenedor('./productos.txt');

data.save({
	title: 'peras',
	price: 2000,
	thumbnail: 'https://www.cucinare.tv/wp-content/uploads/2019/04/Peras.jpg',
});
data.getById(3).then((value) => console.log(value));
// data.getAll().then(value => console.log(value))
// data.deleteById(2);
// data.deleteAll()
module.exports = contenedor;
