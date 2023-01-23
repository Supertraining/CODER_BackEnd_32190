import express, { json, urlencoded } from 'express';
import routerProductos from './router/routerProductos.js';
import routerCarrito from './router/routerCarrito.js';
import routerMongoDbProductos from './router/routerMongoProductos.js';
import routerMongoDbCarritos from './router/routerMongoCarritos.js';
import routerFirebaseDbProductos from './router/routerFirebaseProductos.js';
import routerFirebaseDbCarritos from './router/routerFirebaseCarritos.js';
import routerMySqlDbProdutos from './router/routerMySqlProductos.js';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);

app.use('/api/carrito', routerCarrito);

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
