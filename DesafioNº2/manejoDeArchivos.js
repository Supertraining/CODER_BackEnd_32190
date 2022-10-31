const fs = require('fs');

class contenedor {
	constructor(name) {
		this.name = name;
		this.id = 1;
	}

	async save(obj) {
		const file = `./${this.name}`;

		try {
			if (fs.existsSync(file)) {
				const producto = await fs.promises.readFile(`./${this.name}`, 'utf-8');
				const newProducto = JSON.parse(producto);
				newProducto.push({ ...obj, id: newProducto.length + 1 });
				await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newProducto));

				const index = newProducto.length - 1;
				return newProducto[index].id;
			} else {
				await fs.promises.writeFile(
					`./${this.name}`,
					JSON.stringify([{ ...obj, id: this.id }])
				);
				return this.id;
			}
		} catch (err) {
			throw new Error('Ocurrio un error' + err);
		}
	}

	async getById(n) {
		try {
			const productos = await fs.promises.readFile(`./${this.name}`, 'utf-8');
			const newProductos = JSON.parse(productos);
			const resultado = newProductos.find((e) => e.id === n);
			if (resultado) {
				return resultado;
			} else {
				return null;
			}
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}

	async getAll() {
		try {
			const productos = await fs.promises.readFile(`./${this.name}`, 'utf-8');
			const newProductos = JSON.parse(productos);
			return newProductos;
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}

	async deleteById(n) {
		try {
			const productos = await fs.promises.readFile(`./${this.name}`, 'utf-8');
			const newProductos = JSON.parse(productos);
			const resultado = newProductos.filter((e) => e.id !== n);
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(resultado));
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(`./${this.name}`, '');
		} catch (err) {
			throw new Error('Ocurrio un error');
		}
	}
}

const data = new contenedor('productos.txt');

data.save({
	title: 'acelga',
	price: 290,
	thumbnail: 'https://www.gastronomiavasca.net/uploads/image/file/3309/w700_acelgas.jpg',
});
// data.getById(3).then(value => console.log(value))
// data.getAll().then(value => console.log(value))
// data.deleteById(3)
// data.deleteAll()
