import io from '../server.js';
import * as services from '../services/messages.js';
import logger from '../Logger/Logger.js';

export const newMessages = async (data) => {
	try {
		await services.addMessage(data);
		let messages = services.getAllNormalized;
		io.sockets.emit('normalizedMessages', messages);
	} catch (err) {
		logger.error(err);
	}
};

export const getAllMessages = async () => {
	try {
		let messages = await services.getAllNormalized();
		return messages;
	} catch (err) {
		logger.error(err);
	}
}
