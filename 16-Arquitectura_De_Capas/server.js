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
import { sockets } from './controllers/sockets.js';
import cluster from 'cluster';
import logger, { routeLogger } from './Logger/Logger.js';
import * as config from './config/config.js';
import noRouteRouter from './routes/non-ExistentRoutes.js';

dbConnection(config.mongoURL);

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

app.use('/api/', calculoRouter);
app.use(userRouter);
app.use('/api/', infoRouter)
app.use('/api/', fakerRouter);
app.use(noRouteRouter)

io.on('connection', sockets)

if (cluster.isMaster && config.modo === 'CLUSTER') {
	console.log(`Primary Process PID ${process.pid}`);
	for (let i = 0; i < config.numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid}, died: ${new Date().toLocaleString()}`);
		cluster.fork();
	});
} else {
	const PORT = config.puerto;
	httpServer.listen(PORT, () => {
		logger.info(`Server on at ${PORT} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
	});
}
