const express = require('express')
const app = express()
const contenedor = require('../DesafioNº2/manejoDeArchivos.js')

let contenedorFrutas = new contenedor('./productos.txt')

contenedorFrutas.getAll()
.then(data => {
    app.get('/productos', (req, res)=>{
        res.send(data)
    })
})

    app.get('/productoRandom', (req, res)=>{
		let randomNumber = Math.floor(Math.random() * (3) + 1);
		contenedorFrutas.getById(randomNumber)
		.then((data) => {
			res.send(data)
		})
	})
	

const PORT = 8080;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})

