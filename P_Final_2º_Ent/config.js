import MongoProductsContainer from './api/MongoDB/mongoProductsDbContainer';
const mongoDbProductContainer = new MongoProductsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);
// mongoDbProductContainer.save({
// 	nombre: "",
// 	descripcion: "",
// 	codigo: 999,
// 	foto: "",
// 	precio: 999})
// .then(data => console.log(data));
// mongoDbProductContainer.getAll()
// .then(data => console.log(data));
// mongoDbProductContainer.getById('')
// .then(data => console.log(data));
// mongoDbProductContainer.updateProduct('', {nombre: '',
// descripcion: '',
// codigo: 999,
// foto: '',
// precio: 999,})
// .then(data => console.log(data));
// mongoDbProductContainer.deleteById('')
// .then(data => console.log(data));


import MongoCartsContainer from './api/MongoDB/mongoCartsDbContainer';
const mongoDbCartContainer = new MongoCartsContainer(
	'mongodb+srv://Matias:matias1422@myfirstcluster.lnamsiz.mongodb.net/ecommerce?retryWrites=true&w=majority'
);
// mongoDbCartContainer.createCart()
// .then(data => console.log(data));
// mongoDbCartContainer.addProduct()
// .then(data => console.log(data));
// mongoDbCartContainer.getByCartId()
// .then(data => console.log(data));
// mongoDbCartContainer.deleteCartProductById()
// .then(data => console.log(data));
// mongoDbCartContainer.deleteCartById()
// .then(data => console.log(data));


import FirebaseProductsContainer from './api/Firebase/firebaseProductsConatiner';
const firebaseDbProductContainer = new FirebaseProductsContainer('../../firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.json');
// firebaseDbProductContainer.save()
// .then(data => console.log(data));
// firebaseDbProductContainer.getAll()
// .then(data => console.log(data));
// firebaseDbProductContainer.getById()
// .then(data => console.log(data));
// firebaseDbProductContainer.updateProduct()
// .then(data => console.log(data));
// firebaseDbProductContainer.deleteById()
// .then(data => console.log(data));


import FirebaseCartsContainer from './api/Firebase/firebaseCartsContainer';
const firebaseDbCartsContainer = new FirebaseCartsContainer('../../firebaseSDK/ecommerce-f9af1-firebase-adminsdk-y5slf-dd2c166874.json');
// firebaseDbCartsContainer.createCart()
// .then(data => console.log(data));
// firebaseDbCartsContainer.addProduct()
// .then(data => console.log(data));
// firebaseDbCartsContainer.getByCartId()
// .then(data => console.log(data));
// firebaseDbCartsContainer.deleteCartProductById()
// .then(data => console.log(data));
// firebaseDbCartsContainer.deleteCartById()
// .then(data => console.log(data));


import contenedorLocalCarritos from './api/contenedorCarrito.js';
const contenedorCarrito = new contenedorLocalCarritos('./persistencia/carritos.txt')

// contenedorCarrito.createCart()
// .then(data => console.log(data));
// contenedorCarrito.addProduct(1,1)
// .then(data => console.log(data));
// contenedorCarrito.getByCartId(1)
// .then(data => console.log(data))
// contenedorCarrito.deleteCartProductById(1,1)
// .then(data => console.log(data))
// contenedorCarrito.deleteCartById(1)
// .then(data => console.log(data))

import contenedorLocalProductos from './api/contenedorDeProd.js';
const contenedorProductos = new contenedorLocalProductos('./persistencia/productos.txt')

// contenedorProductos.save({nombre: "prueba"})
// .then(data => console.log(data));
// contenedorProductos.getAll()
// .then(data => console.log(data));
// contenedorProductos.updateProduct(1, {nombre: "pruebaActualizada"})
// .then(data => console.log(data));
// contenedorProductos.getById(1)
// .then(data => console.log(data));
// contenedorProductos.deleteById(1)
// .then(data => console.log(data));



