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

    getById = async (ctx) => {
        try {
            let usuario = await this.userService.getById(ctx.req.user.username);
            routeLogger(ctx.request, 'info')
            return await ctx.render('inicio', {
                userName: usuario.username,
            });
        } catch (error) {
            routeLogger(ctx.request, 'error', error);
        }
    }

    async authHash(username, password) {
        const auth = await this.userService.authHash(username, password);
        return auth;
    }

    async login(ctx) {
        try {
            if (ctx.isAuthenticated()) {
                ctx.response.redirect('inicio');
            } else {
                routeLogger(ctx.request, 'info')
                return await ctx.render('login.ejs');
            }

        } catch (error) {
            routeLogger(ctx.request, 'error', error);
        }

    }

    async logout(ctx) {
        try {
            if (!ctx.req.user.username) {
                 await ctx.render('endSession', { userName: 'sesion finalizada' })
            }
                     ctx.logout((err) => {
                        if (err) {
                            logger.error('Error en cierre de sesión');
                        } else {
                            logger.info('session eliminada con éxito');
                        }
                      ctx.redirect('inicio');  
                    })
             


        } catch (error) {
            routeLogger(ctx.request, 'error', error);
        }

    }
    getRegister = async (ctx) => {
        return await ctx.render('register.ejs');
    }

    getInicio = async (ctx) => {
        ctx.response.redirect('/inicio');
    }

    failregister = async (ctx) => {
        return await ctx.render('register-error');
    }

    failLogin = async (ctx) => {
        return await ctx.render('login-error');
    }
}

