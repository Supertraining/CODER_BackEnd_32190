const express = require('express')
const fs = require('fs')
const app = express()


class contenedor {
	constructor(path) {
		this.path = path;
	}

	async save(producto) {
		let newProducto = null;
		let id = 1;

		let data = await this.getAll()

		if (data.length === 0) {
			await fs.promises.writeFile(`${this.path}`, JSON.stringify([{ ...producto, id: id }]));
			return id;
		} else {
			newProducto = JSON.parse(data);
			newProducto.push({ ...producto, id: newProducto.length + 1 });
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
        try {
        let data = await this.getAll()
		const newData = JSON.parse(data);
		const resultado = newData.find((e) => e.id === n);
		if (resultado) {
			return resultado;
		} else {
			return ('El producto no existe');
		}   
        }
        catch (err) {
            console.log('ocurrio un error' + err);
        }
	}

	async getAll() {
		let data = null;
		try {
			data = await fs.promises.readFile(`${this.path}`, 'utf-8');
			return data;
		} catch (err) {
			return data = [];
		}
	}
}

let contenedorFrutas = new contenedor('./productos.txt')

contenedorFrutas.getAll()
.then(data => {
    app.get('/productos', (req, res)=>{
        res.send(data)
    })
})

let randomNumber = Math.round(Math.random()) 

contenedorFrutas.getById(randomNumber)
.then(prod => {
    app.get('/productoRandom', (req, res)=>{
        res.send(prod)
    })
})

// contenedorFrutas.save({title : 'Peras', price: 7000, thumbnail: 'http://Peras.jpg' })

const PORT = 8080;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})

