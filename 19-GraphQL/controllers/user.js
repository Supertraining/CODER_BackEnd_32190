import UserService from '../services/user.js'
import logger, { routeLogger } from '../Logger/Logger.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    save = async (req, res) => {
        try {
            const newUser = await this.userService.save(req.body)
            res.json(newUser);
        } catch (error) {
            logger.error(error)
        }
    }

    getAll = async (req, res) => {
        let data = null;
        try {
            data = await this.userService.getAll()
            res.json(data);
        } catch (error) {
            logger.error(error)
            return data = [];
        }
    }

    getById = async (req, res) => {
        try {
            let id = null;
            let usuario = null;
            if (!req.body.username) {
                id = req.user.username
                usuario = await this.userService.getById(id);
                 res.render('inicio', {
                userName: usuario.username,
            });
            } else { 
                id = req.body.username
                console.log(id);
                usuario = await this.userService.getById(id);
                res.json(usuario);
            }
           
            routeLogger(req, 'info')
        } catch (error) {
            routeLogger(req, 'error', error);
        }
    }

    delete = async (req, res) => {
        try {
            let deleted = await this.userService.delete(req.body);
            res.json(deleted);
        } catch (err) {
            logger.error(err)
        }
    }

    async update(obj) {
        try {
            let updated = await this.userService.update(obj);
            return updated;
        } catch {
            logger.error(err)
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

