const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = require('./router/routerProductos');
const routerCarrito = require('./router/routerCarrito');
const routerMongoDbProductos = require('./router/routerMongoProductos');
const routerMongoDbCarritos = require('./router/routerMongoCarritos')
const routerFirebaseDbProductos = require('./router/routerFirebaseProductos')
const routerFirebaseDbCarritos = require('./router/routerFirebaseCarritos')

app.use('/productos', routerProductos);

routerProductos.get;
routerProductos.post;
routerProductos.put;
routerProductos.delete;

app.use('/carrito', routerCarrito);

routerCarrito.get;
routerCarrito.post;
routerCarrito.put;
routerCarrito.delete;

app.use('/mongoDB/productos', routerMongoDbProductos);

routerMongoDbProductos.get;
routerMongoDbProductos.post;
routerMongoDbProductos.put;
routerMongoDbProductos.delete;

app.use('/mongoDB/carritos', routerMongoDbCarritos);

routerMongoDbCarritos.get;
routerMongoDbCarritos.post;
routerMongoDbCarritos.put;
routerMongoDbCarritos.delete;

app.use('/firebaseDB/productos', routerFirebaseDbProductos);

routerFirebaseDbProductos.get;
routerFirebaseDbProductos.post;
routerFirebaseDbProductos.put;
routerFirebaseDbProductos.delete;

app.use('/firebaseDB/carritos', routerFirebaseDbCarritos
);

routerFirebaseDbProductos.get;
routerFirebaseDbProductos.post;
routerFirebaseDbProductos.put;
routerFirebaseDbProductos.delete;


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}`);
});
