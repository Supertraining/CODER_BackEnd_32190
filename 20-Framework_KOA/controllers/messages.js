import io from '../server.js';
import logger from '../Logger/Logger.js';
import MessageService from '../services/messages.js';

export default class MessagesController {

	constructor() {
		this.messageService = new MessageService();
	}

	save = async (data) => {
		try {
			await this.messageService.save(data)
			let messages = await this.messageService.getAll();
			io.sockets.emit('normalizedMessages', messages);
		} catch (error) {
			logger.error(error)
		}
	}

	getAll = async () => {
		let data = null;
		try {
			data = await this.messageService.getAll();
			return data;
		} catch (err) {
			logger.error(err)
			return data = [];
		}
	}
}






