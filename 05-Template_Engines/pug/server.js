const  express = require('express');
const app = express();

const productos = [];

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('formulario')
})
app.get('/productos', (req, res) => {
    res.render('historial', {productos})
})

app.post('/productos', (req, res) => {
        productos.push(req.body)
        res.redirect('/')  
})
app.post('/historial', (req, res) => {
    res.redirect('/productos') 
})

app.listen(8080);
