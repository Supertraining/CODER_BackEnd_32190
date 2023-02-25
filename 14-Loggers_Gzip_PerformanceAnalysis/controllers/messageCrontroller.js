import ClienteMongo from '../api/mongoDbMessagesContainer.js';
import io from '../server.js';

const messageContainer = new ClienteMongo(process.env.MONGODBURL);

export const newMessages = async (data) => {
	try {
		await messageContainer.insertarMensaje(data);
		let messages = await messageContainer.getAllNormalized();
		io.sockets.emit('normalizedMessages', messages);
	} catch (err) {
		console.log(err);
	}
};

export default async function getAllMessages() {
	try {
		let messages = await messageContainer.getAllNormalized();
		return messages;
	} catch (error) {
		console.log('ha ocurrido un error' + error);
	}
}
