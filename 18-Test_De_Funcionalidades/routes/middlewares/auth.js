import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { routeLogger } from '../../Logger/Logger.js';
import UserService from '../../services/user.js'
import logger from '../../Logger/Logger.js';

let userService = new UserService();



    passport.serializeUser(async (user, done) => {
		try {
			let usuario = await user.username
			;
			done(null, usuario)			
        } catch (error) {
            logger.error(error)
        };
    });

    passport.deserializeUser(async (username, done) => {
		try {
			let usuario = await userService.getById(username);
			done(null, usuario);
			
			
        } catch (error) {
            logger.error(error)
        }
    });




export const passportRegister = async (req, res, next) => {
	try {
		
		passport.use(
			'register',
			new LocalStrategy(
				{
					passReqToCallback: true,
				},
				async (req, username, password, done) => {
				
					let usuario = await userService.getById(username);
					
				
					if (usuario) {
						return done(null);
					}
					
					let newUser = await userService.save({ username, password });
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
				let usuario = await userService.getById(username);
				let auth = await userService.authHash(username, password);
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


