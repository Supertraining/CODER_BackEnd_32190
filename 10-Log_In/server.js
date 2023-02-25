import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { options } from './options/mariaDB.js';
import ClienteSQL from './api/sqlConatiner.js';
import ClienteMongo from './api/mongoDbContainer.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';

const productContainer = new ClienteSQL(options, 'productos');
const messageContainer = new ClienteMongo(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
	session({
		store: mongoStore.create({
			mongoUrl:
				'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority',
			mongoOptions: advancedOptions,
			collectionName: 'sessions',
			ttl: 60,
		}),
		secret: 'calabaza',
		resave: false,
		saveUninitialized: false,
	})
);

app.get('/', (req, res) => {
	messageContainer.getAllNormalized();
	if (!req.query.logout) {
		if (!req.session.user) {
			res.redirect('login');
		} else {
			res.render('inicio', { userName: req.session.user });
		}
	} else {
		res.redirect('endSession');
	}
});

app.get('/login', (req, res) => {
	if (!req.query.userName) {
		res.render('login');
	} else if (req.query.userName) {
		if (!req.session.user) {
			req.session.user = req.query.userName;
			req.session.admin = true;
			res.redirect('/');
		}
	}
});

app.get('/endSession', (req, res) => {
	res.render('endSession', { userName: req.session.user });
	setTimeout(() => {
		req.session.destroy((err) => {
			if (err) {
				console.log('Error en cierre de sesión');
			} else {
				console.log('session eliminada con éxito');
			}
		});
	}, 2000);
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
