import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { options } from './options/mariaDB.js';
import ClienteSQL from './api/sqlConatiner.js';
import ClienteMongo from './api/mongoDbContainer.js';

const productContainer = new ClienteSQL(options, 'productos');
const messageContainer = new ClienteMongo('mongodb://localhost:27017/ecommerce');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	messageContainer.getAllNormalized();
	res.render('inicio');
});

app.get('/api/productos-test', (req, res) => {
	productContainer
		.fakerProducts()
		.then((fproducts) => res.render('fakeproducts', { fproducts: fproducts }));
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
		productContainer.getProductByID(id).then((data) => {
			io.sockets.emit('selectedProd', data);
		});
	});

	Socket.on('new-message', (data) => {
		messageContainer.insertarMensaje(data).then(() => console.log('data inserted'));
		messageContainer.getAllNormalized().then((messages) => {
			io.sockets.emit('normalizedMessages', messages);
		});
	});

	messageContainer.getAllNormalized().then((data) => {
		Socket.emit('normalizedMessages', data);
	});
});

const PORT = 8080;
httpServer.listen(PORT, () => {
	console.log(`Server on at ${PORT}`);
});
