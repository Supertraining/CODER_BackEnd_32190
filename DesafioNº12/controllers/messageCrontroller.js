import ClienteMongo from '../api/mongoDbMessagesContainer.js';
import io from '../server.js'
import { Socket } from 'socket.io';

const messageContainer = new ClienteMongo(
	process.env.MONGODBURL
);

export const newMessages = async (data) => {
	await messageContainer.insertarMensaje(data);
	let messages = await messageContainer.getAllNormalized();
	io.sockets.emit('normalizedMessages', messages);
};

export default async function getAllMessages() {
	try {
		let messages =  await messageContainer.getAllNormalized()
		return messages
	} catch (error) {
		console.log('ha ocurrido un error' + error);
	}
}
