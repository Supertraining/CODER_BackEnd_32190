import calculo from "../utils/calculo.js";


process.on('exit', () => {
	console.log('hilo terminado: ' + process.pid);
});

process.on('message', (data) => {
	const result = calculo(data);
	if(result) {
		process.send(result);
	}
	process.exit();
});

process.send('listo');

