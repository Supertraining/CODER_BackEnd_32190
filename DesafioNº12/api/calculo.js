function calculo(data) {
	let cantidad = 0;
	!data ? (cantidad = 100000000) : (cantidad = data);
	const hash = {};
	for (let i = 0; i <= cantidad; i++) {
		const val = Math.ceil(Math.random() * 1000);
		hash[val] ? (hash[val] += 1) : (hash[val] = 1);
	}
	return hash;
}

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
