import UserController from '../controllers/user.js';
import ProductsControllers from '../controllers/productsSockets.js';
import MessagesController from '../controllers/messages.js';
import express, { Router } from 'express';
import passport from 'passport';
import { passportLogin, passportRegister, requireAuthentication } from './middlewares/auth.js';
import logger from '../Logger/Logger.js';

const userController = new UserController();
const messageController = new MessagesController();
const productsController = new ProductsControllers();
const router = express.Router();

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

//!!! USER *********************!!!!!!!!!!!!!!!!///

router.get('/register', userController.getRegister);

router.post(
	'/register',
	passportRegister,
	passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/inicio' })
);

router.get('/failregister', userController.failregister);

router.get('/login', userController.login);

router.post(
	'/login',
	passportLogin,
	passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
);

router.get('/faillogin', userController.failLogin);

router.get('/inicio/', requireAuthentication, userController.getById);

router.get('/logout', userController.logout);

router.get('/', userController.getInicio);

router.get('/all', userController.getAll);
router.get('/byId', userController.getById) 
router.delete('/delete', userController.delete); //!! FALTA PROBAR
router.put('/update', userController.update);  //!! FALTA PROBAR


export default router;