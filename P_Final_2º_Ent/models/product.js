const mongoose =  require('mongoose');

const productsCollection = 'products';
const productsSchema = new mongoose.Schema({
        timestamp : {type: Date},
        nombre: {type: String, require: true, max: 100},
        descripcion: {type: String, require: true, max: 140},
        codigo: {type: Number, require: true, max: 9999},
        foto: {type: String, require: true},
        precio: {type: Number, require: true, max: 5000},
        Stock: {type: Number, require: true, max: 7000},
})

const Productmodel = mongoose.model(productsCollection, productsSchema)

module.exports = Productmodel;