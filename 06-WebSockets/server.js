const express = require('express');
const fs =  require('fs');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

const productos = [ ];

const messages = [ ];


app.get('/', (req, res) => {
    res.render('inicio')
})


io.on('connection', (Socket) => {
	console.log('Nuevo usuario conectado');

    Socket.emit('productos', productos);

    Socket.on('new-product', data => {
        productos.push(data);
        io.sockets.emit('productos', productos)
    })

    Socket.emit('messages', messages);
    
    Socket.on('new-message', data => {

        messages.push(data);
        fs.appendFileSync('./public/historialDeMsjs.txt', JSON.stringify({...data, date: new Date().toLocaleString()}));

        io.sockets.emit('messages', messages)
    })
})



const PORT = 8080;
httpServer.listen(PORT, () => {
	console.log(`Server on at ${PORT}`);
});