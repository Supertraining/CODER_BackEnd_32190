import logger, { routeLogger } from "../Logger/Logger.js";
import { obtenerUsuario, serialDeserial } from "../services/user.js";


export const getUsuario = async (req, res) => {
    try {
        let usuario = await obtenerUsuario(req.user.username);
        res.render('inicio', {
            userName: usuario.username,
        });
    } catch (error) {
        routeLogger(req, 'error', error);
    }

}

export const userSerialDeserial = async (req, res) => {
    try {
        return await serialDeserial()
    } catch (error) {
        routeLogger(req, 'error', error);
    }

}

export const login = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/inicio');
        }
        res.render('login');
    } catch (error) {
        routeLogger(req, 'error', error);
    }

}

export const logout = async (req, res) => {
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