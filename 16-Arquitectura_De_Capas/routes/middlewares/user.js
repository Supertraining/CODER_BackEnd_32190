import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { routeLogger } from '../../Logger/Logger.js';
import { authUser, nuevoUsuario, obtenerUsuario } from '../../services/user.js';
import { userSerialDeserial } from '../../controllers/user.js';

userSerialDeserial();

export const passportRegister = async (req, res, next) => {
	try {
		passport.use(
			'register',
			new LocalStrategy(
				{
					passReqToCallback: true,
				},
				async (req, username, password, done) => {
					let usuario = await obtenerUsuario(username);
					if (usuario) {
						return done(null);
					}
					let newUser = await nuevoUsuario({ username, password });

					done(null, newUser);
				}
			)
		);
	} catch (error) {
		routeLogger(req, 'error', error);
	}
	next();
}
export const passportLogin = async (req, res, next) => {
	try {
		passport.use(
			'login',
			new LocalStrategy(async (username, password, done) => {
				let usuario = await obtenerUsuario(username);

				let auth = await authUser(username, password);

				if (!usuario) {
					return done(null, false);
				}
				if (!auth) {
					return done(null, false);
				}

				return done(null, usuario);
			})
		);
	} catch (error) {
		routeLogger(req, 'error', error);
	}
	next();
}

export const requireAuthentication = async (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect('/login');
		}
	} catch (error) {
		routeLogger(req, 'error', error);
	}

}


