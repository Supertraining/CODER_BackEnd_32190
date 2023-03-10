import mongoContainer from '../persistence/mongoContainer.js'
const usersContainer = new mongoContainer;
import passport from 'passport';

export const obtenerUsuario = async (username) => {
    try {
        return await usersContainer.getUser(username)
    } catch (error) {
        logger.error(error)
    }
}

export const nuevoUsuario = async (data) => {
    try {
        return await usersContainer.insertUser(data)
    } catch (error) {
        logger.error(error)
    }
}

export const authUser = async (username, password) => {
    try {
        return await usersContainer.authHash(username, password)
    } catch (error) {
        logger.error(error)
    }

}

export const serialDeserial = async () => {

    passport.serializeUser(async (user, done) => {
        try {
            let usuario = await user.username
            done(null, user.username)
        } catch (error) {
            logger.error(error)
        }
        ;
    });

    passport.deserializeUser(async (username, done) => {
        try {
            let usuario = await usersContainer.getUser(username);
            done(null, usuario);
        } catch (error) {
            logger.error(error)
        }
    });
}