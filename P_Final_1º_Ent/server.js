const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



const routerProductos = require('./router/routerProductos')
const routerCarrito = require('./router/routerCarrito')

app.use('/productos', routerProductos)

routerProductos.get
routerProductos.post
routerProductos.put
routerProductos.delete

app.use('/carrito', routerCarrito)


routerCarrito.get
routerCarrito.post
routerCarrito.put
routerCarrito.delete

//todas las rutas no definidas devuelven el html error
// app.get(‘*’, function(req, res){res.sendFile(__dirname+’/public/error.html’);}

const PORT = process.env.PORT || 8080;

app.listen(PORT , () => {
    console.log(`Server listening at ${PORT}`);
 })