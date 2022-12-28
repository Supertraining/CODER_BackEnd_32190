const mongoose = require('mongoose');

const cartsCollection = 'carts';
const cartsSchema = new mongoose.Schema({
	timestamp: { type: Date },
	productos: [
		{
			
		},
	],
});

const Cartmodel = mongoose.model(cartsCollection, cartsSchema);

module.exports = Cartmodel;
