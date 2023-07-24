import logger from "../Logger/Logger.js";
import * as user from '../models/user.js';
import bcrypt from 'bcrypt';
import UsersDAO from "../DAOs/userDAO.js";


export default class UserService {

    constructor() {
        this.userService = new UsersDAO();
    }

     async save(data)  {
         try {
           
             const usuario = { username: data.username, password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10), null) };
             
             let newUser = await this.userService.save(usuario, user.model)
              
            return newUser;

        } catch (error) {
            logger.error(error)
        }
    }

    async getAll() {
        let data = null;
        try {
            data = await this.userService.getAll(user.model)
            return data;
        } catch (error) {
            logger.error(error)
            return data = [];
        }
    }
    async getById(id) {
        let data = null;
        try {
            data = await this.userService.getById(id, user.model);
            return data;
        } catch (err) {
            logger.error(err)
        }
    }
    async delete(id) {
        try {
            let deleted = await this.userService.delete(id, user.model);
            return deleted;
        } catch {
            logger.error(err)
        }
    }
    async update(obj) {
        try {
            let updated = await this.userService.update(obj, user.model);
            return updated;
        } catch {
            logger.error(err)
        }
    }

    authHash = async (username, password) => {
        try {
            const data = await this.getById(username);
            const auth = await bcrypt.compare(password, data.password);
            return auth;
        } catch (err) {
            logger.error(err)
        }
    }
}
