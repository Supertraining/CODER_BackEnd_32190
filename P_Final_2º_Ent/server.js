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
const routerMySqlDbProdutos = require('./router/routerMySqlProductos')

app.use('/api/productos', routerProductos);

app.use('/carrito', routerCarrito);

app.use('/api/mongoDB/productos', routerMongoDbProductos);

app.use('/api/mongoDB/carritos', routerMongoDbCarritos);

app.use('/api/firebaseDB/productos', routerFirebaseDbProductos);

app.use('/api/firebaseDB/carritos', routerFirebaseDbCarritos
);

app.use('/api/MySqlDB/productos', routerMySqlDbProdutos);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server listening at ${PORT}`);
});
