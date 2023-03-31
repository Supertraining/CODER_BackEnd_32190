function calculo(cantidad) {
	const hash = {};
	for (let i = 0; i <= cantidad; i++) {
		const val = Math.ceil(Math.random() * 1000);
		hash[val] ? (hash[val] += 1) : (hash[val] = 1);
	}
	return hash;
}

export default calculo;
