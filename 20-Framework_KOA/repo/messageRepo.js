import DAOFactory from "../DAOs/DAOFactory.js";
import logger from "../Logger/Logger.js";
import * as message from '../models/mensaje.js';
import Mensaje from "../modelos/mensaje.js";

export default class MessageRepo { 
    dao
    mssg
    constructor() {
        this.dao = DAOFactory.getDao()
        this.mssg = this.dao.mssgDAO
    }

    save = async (data) => {
        try {
            const mensaje = await this.mssg.save(data, message.model)
            return mensaje;
        } catch (error) {
            logger.error(error)
        }
    }

    getAll = async () => {
        let data = null;
        try {
            data = await this.mssg.getAll(message.model)
            return data.map(m => new Mensaje(m).datos());
        } catch (error) {
            logger.error(error)
            return data = [];
        }
    }
    async getById(id) {
        let data = null;
        try {
            data = await this.mssg.getById(id, message.model);
            return new Mensaje(data).datos(); 
        } catch (err) {
            logger.error(err);
			return data = [];
        }
    }
    
	async delete(id) {
		try {
            const deleted = await this.mssg.delete(id, message.model);
            return new Mensaje(deleted).datos(); 
		} catch {
			logger.error(err)
		}
    }
    
	async update(obj, model) {
		try {
            const updated = await this.mssg.update(obj, message.model);
            return new Mensaje(updated).datos(); 
		} catch {
			logger.error(err)
		}
	}
}

