import UserController from '../controllers/user.js';
import ProductsControllers from '../controllers/products.js';
import MessagesController from '../controllers/messages.js';
import Router from "koa-router";
import passport from 'passport';
import { passportLogin, passportRegister, requireAuthentication } from './middlewares/auth.js';
import logger from '../Logger/Logger.js';


const userController = new UserController();
const messageController = new MessagesController();
const productsController = new ProductsControllers();
const userRouter = new Router({
	prefix: '/'
});


export const sockets = async (Socket) => {
	logger.info('Nuevo usuario conectado');

	let productos = await productsController.getAll();

	Socket.emit('productos', productos);

	Socket.on('new-product', productsController.save);

	Socket.on('deleteProduct', productsController.delete);

	Socket.on('updatedProduct', productsController.update);

	Socket.on('selectedProduct', productsController.getById);

	Socket.on('new-message', messageController.save);

	let messages = await messageController.getAll();
	
	Socket.emit('normalizedMessages', messages);
}


userRouter.get('register', userController.getRegister);

userRouter.post(
	'register',
	passportRegister,
	passport.authenticate('register', { failureRedirect: 'failregister', successRedirect: 'inicio' })
);

userRouter.get('failregister', userController.failregister);

userRouter.get('login', userController.login);

userRouter.post(
	'login',
	passportLogin,
	passport.authenticate('login', { failureRedirect: 'faillogin', successRedirect: 'inicio' })
);

userRouter.get('faillogin', userController.failLogin);

userRouter.get('inicio', requireAuthentication, userController.getById);

userRouter.get('logout', userController.logout);

userRouter.get('/', userController.getInicio);

export default userRouter.routes();