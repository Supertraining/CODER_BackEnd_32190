import UserService from '../services/user.js'
import logger, { routeLogger } from '../Logger/Logger.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    save = async (data) => {
       
        try {
            const newUser = await this.userService.save(data)
            return newUser;
        } catch (error) {
            
            logger.error(error)
        }
    }

   getById = async (req, res) => {
        try {
            let usuario = await this.userService.getById(req.user.username);
            res.render('inicio', {
                userName: usuario.username,
            });
            routeLogger(req, 'info')
        } catch (error) {
            routeLogger(req, 'error', error);
        }
    }

    async authHash(username, password) {
        const auth = await this.userService.authHash(username, password);
        return auth;
    }

    async login(req, res) {
        try {
            if (req.isAuthenticated()) {
                res.redirect('/inicio');
            }
            res.render('login');
        } catch (error) {
            routeLogger(req, 'error', error);
        }

    }

    async logout(req, res) {
        try {
            if (!req.user) {
                res.render('endSession', { userName: 'sesion finalizada' })
            }
            res.render('endSession', { userName: req.user.username });
            setTimeout(() => {
                req.logout((err) => {
                    if (err) {
                        logger.error('Error en cierre de sesión');
                    } else {
                        logger.info('session eliminada con éxito');
                    }
                });
            }, 2000);
        } catch (error) {
            routeLogger(req, 'error', error);
        }

    }
    getRegister = (req, res) => {
        res.render('register');
    }

    getInicio = (req, res) => {
        res.redirect('/inicio');
    }

    failregister = (req, res) => {
        res.render('register-error');
    }

    failLogin = (req, res) => {
        res.render('login-error');
    }
}

