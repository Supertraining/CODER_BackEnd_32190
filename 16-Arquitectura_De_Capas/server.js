import express from 'express';
import http, { request } from 'http';
import { Server } from 'socket.io';
import { dbConnection } from './utils/mongoDbConnection.js';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/user.js';
import calculoRouter from './routes/calculo.js';
import fakerRouter from './routes/faker.js'
import infoRouter from './routes/info.js';
import * as ProductControllers from './controllers/products.js';
import * as messageControllers from './controllers/messages.js';
import cluster from 'cluster';
import logger, { routeLogger }  from './Logger/Logger.js';
import parseArgs from 'minimist';
import { minimistConfig, mongoURL, sessionConfig } from './config/config.js';

dbConnection(mongoURL)

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
export default io;

app.use(
	session(sessionConfig)
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/',calculoRouter);
app.use(userRouter);
app.use('/api/', infoRouter)
app.use('/api/', fakerRouter);

app.all('/*',  (req, res) => {
    const { url, method } = req
	routeLogger(req, 'warn');
	res.send(`La ruta ${method} ${url} no esta implementada`)
})

io.on('connection', async (Socket) => {
	console.log('Nuevo usuario conectado');

	let productos = await ProductControllers.getAllProducts();
	
	Socket.emit('productos', productos);

	Socket.on('new-product', ProductControllers.saveProduct);

	Socket.on('deleteProduct', ProductControllers.deleteProductById);

	Socket.on('updatedProduct', ProductControllers.updateByProduct);

	Socket.on('selectedProduct', ProductControllers.getProductByID);

	Socket.on('new-message', messageControllers.newMessages);

	let messages = await messageControllers.getAllMessages();
	
	Socket.emit('normalizedMessages', messages);
});


const { puerto } = parseArgs(process.argv.slice(2), minimistConfig);
const { modo } = parseArgs(process.argv.slice(3), minimistConfig);

if (cluster.isMaster && modo === 'CLUSTER') {
	console.log(`Primary Process PID ${process.pid}`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid}, died: ${new Date().toLocaleString()}`);
		cluster.fork();
	});
} else {
	const PORT = puerto;
	httpServer.listen(PORT, () => {
		logger.info(`Server on at ${PORT} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
	});
}
