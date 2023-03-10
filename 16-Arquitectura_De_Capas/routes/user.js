import express from 'express';
import passport from 'passport';
import { passportLogin, passportRegister, requireAuthentication } from './middlewares/user.js';
import { getUsuario, login, logout, userSerialDeserial } from '../controllers/user.js';

userSerialDeserial()

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
	res.render('register');
});

userRouter.post(
	'/register',
	passportRegister,
	passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' })
);

userRouter.get('/failregister', (req, res) => {
	res.render('register-error', { error: req });
});

userRouter.get('/login', login);

userRouter.post(
	'/login',
	passportLogin,
	passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/inicio' })
);

userRouter.get('/faillogin', (req, res) => {
	res.render('login-error');
});

userRouter.get('/inicio', requireAuthentication, getUsuario);

userRouter.get('/logout', logout);

userRouter.get('/', (req, res) => {
	res.redirect('/inicio');
});

export default userRouter;
