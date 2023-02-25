const express = require('express');
const fs = require('fs');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { options } = require('./options/mariaDB');
const { SQLiteoptions } = require('./options/SQLite3');
const { ClienteSQL } = require('./sqlConatiner');

const knex = require('knex')(options);

const productContainer = new ClienteSQL(options, 'productos');
const messageContainer = new ClienteSQL(SQLiteoptions, 'messages' )

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	res.render('inicio');
});

io.on('connection', (Socket) => {
	console.log('Nuevo usuario conectado');

	productContainer.getAll('productos').then((productos) => Socket.emit('productos', productos));

	Socket.on('new-product', (data) => {
		productContainer.insertarProductos(data).then(() => console.log('data inserted'));
		productContainer.getAll('productos').then((productos) => {
			io.sockets.emit('productos', productos);
		});
	});

	Socket.on('deleteProduct', (id) => {
		productContainer.deleteProduct(id).then(() => console.log('producto eliminado'));
		productContainer.getAll('productos').then((productos) => {
			io.sockets.emit('productos', productos);
		});
	});

	Socket.on('updatedProduct', (data) => {
		productContainer.updatedProduct(data);
		productContainer.getAll('productos').then((productos) => {
			io.sockets.emit('productos', productos);
		});
	});

	Socket.on('selectedProduct', (id) => {
		productContainer.getProductByID(id)
		.then((data) => {
			io.sockets.emit('selectedProd', data);
	})
})

	messageContainer.getAll('messages')
	.then((messages) => Socket.emit('messages', messages));
	

	Socket.on('new-message', (data) => {
		messageContainer.insertarProductos(data).then(() => console.log('data inserted'));
		messageContainer.getAll('messages').then((messages) => {
			io.sockets.emit('messages', messages);
		});
	});

});

const PORT = 8080;
httpServer.listen(PORT, () => {
	console.log(`Server on at ${PORT}`);
});
