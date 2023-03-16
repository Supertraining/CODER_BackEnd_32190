import express from 'express';
import passport from 'passport';
import { passportLogin, passportRegister, requireAuthentication } from './middlewares/user.js';
import * as controller from '../controllers/user.js';


const userRouter = express.Router();

userRouter.get('/register', controller.getRegister);

userRouter.post(
	'/register',
	passportRegister,
	passport.authenticate('register', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
);

userRouter.get('/failregister', controller.failregister);

userRouter.get('/login', controller.login);

userRouter.post(
	'/login',
	passportLogin,
	passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
);

userRouter.get('/faillogin', controller.failLogin);

userRouter.get('/inicio', requireAuthentication, controller.getUsuario);

userRouter.get('/logout', controller.logout);

userRouter.get('/', controller.getInicio);

export default userRouter;
