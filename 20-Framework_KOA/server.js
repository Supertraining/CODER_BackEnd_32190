import koa from 'koa';
import { koaBody } from 'koa-body';
import serve from 'koa-static';
import views from 'koa-views';
import cors from '@koa/cors'

import http from 'http';
import { Server } from 'socket.io';
import session from 'koa-session';
import passport from 'passport';

import noRouteRouter from './routes/non-ExistentRoutes.js';
import userRouter from './routes/user_Message_Products.js';
import calculoRouter from './routes/calculo.js';
import fakerRouter from './routes/faker.js'
import infoRouter from './routes/info.js';
import { sockets } from './routes/user_Message_Products.js';

import cluster from 'cluster';
import logger from './Logger/Logger.js';
import * as config from './config/config.js';


import ProductsRoutes from './routes/products.js';

import * as url from 'url';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = new koa();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
export default io;

app.keys = ['secret'];
app.use(
	session({maxAge:6000}, app));
const render = views(__dirname + '/view', { autoRender: true, extension: 'ejs' });
app.use(render)	

app.use(passport.initialize());
app.use(passport.session());
app.use(serve('./public'));
app.use(koaBody());

const productRouter = new ProductsRoutes();

app.use(cors())
app.use(calculoRouter); 
app.use(userRouter);  
app.use(infoRouter); 
app.use(fakerRouter); 
app.use(productRouter.start()); 
app.use(noRouteRouter) 

io.on('connection', sockets);

if (cluster.isPrimary && config.modo === 'CLUSTER') {
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
	app.listen(PORT, () => {
		logger.info(`Server on at ${PORT} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
	});
}

