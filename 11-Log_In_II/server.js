import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { options } from './options/mariaDB.js';
import ClienteSQL from './api/sqlConatiner.js';
import ClienteMongo from './api/mongoDbMessagesContainer.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import userRouter from './routes/router.js'

const productContainer = new ClienteSQL(options, 'productos');
const messageContainer = new ClienteMongo(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
	session({
		store: mongoStore.create({
			mongoUrl:
				'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority',
			mongoOptions: advancedOptions,
			collectionName: 'sessions',
			ttl: 600,
		}),
		secret: 'calabaza',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(userRouter)

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
