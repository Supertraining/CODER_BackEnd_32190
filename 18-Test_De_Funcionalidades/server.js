import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/user_Message_Products.js';
import calculoRouter from './routes/calculo.js';
import fakerRouter from './routes/faker.js'
import infoRouter from './routes/info.js';
import { sockets } from './routes/user_Message_Products.js';
import cluster from 'cluster';
import logger from './Logger/Logger.js';
import * as config from './config/config.js';
import noRouteRouter from './routes/non-ExistentRoutes.js';
import cors from 'cors';
import ProductsRoutes from './routes/products.js';

const productRouter =  new ProductsRoutes();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
export default io;

app.use(
	session(config.sessionConfig)
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use('/api/', calculoRouter);
app.use(userRouter);
app.use('/api/', infoRouter)
app.use('/api/', fakerRouter);
app.use('/products', productRouter.start());
app.use(noRouteRouter)


io.on('connection', sockets);

if (cluster.isPrimary && config.modo === 'CLUSTER') {
	console.log(config.modo)
	logger.info(`Primary Process PID ${process.pid}`);
	for (let i = 0; i < config.numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		logger.info(`worker ${worker.process.pid}, died: ${new Date().toLocaleString()}`);
		cluster.fork();
	});
} else {
	const PORT = config.puerto;
	httpServer.listen(PORT, () => {
		logger.info(`Server on at ${PORT} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
	});
}
