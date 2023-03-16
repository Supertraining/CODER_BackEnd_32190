import logger, { routeLogger } from "../Logger/Logger.js";
import { obtenerUsuario, serialDeserial } from "../services/user.js";
import passport from 'passport';



export const getUsuario = async (req, res) => {
    try {
        let usuario = await obtenerUsuario(req.user.username);
        res.render('inicio', {
            userName: usuario.username,
        });
        routeLogger(req, 'info')
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
export const getRegister = (req, res) => {
    res.render('register');
}

export const getInicio = (req, res) => {
	res.redirect('/inicio');
}

export const failregister = (req, res) => {
	res.render('register-error');
}

export const failLogin = (req, res) => {
    res.render('login-error');
}


