import calculo from "../utils/calculo.js";


process.on('exit', () => {
	console.log('hilo terminado: ' + process.pid);
});

process.on('message', async (data) => {

	const result = await calculo(data);

	if(result) {
		await process.send(result);
	}
	process.exit();
});

process.send('listo');

