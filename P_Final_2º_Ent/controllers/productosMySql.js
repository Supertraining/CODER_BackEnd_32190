import options from '../options/mariaDB.js';
import ContenedorProductosSQL from '../api/MySql/contenedorProductosMySql.js';
const MySqlDbProductContainer = new ContenedorProductosSQL(options, 'productos');

export const getProducts = async (req, res) => {
    let data = null;
    !req.params.id 
	? data = await MySqlDbProductContainer.getAll()
	: data = await MySqlDbProductContainer.getById(req.params.id)
    MySqlDbProductContainer.close();
    res.json(data)
}

export const createProduct = async (req, res) => {
    let data = await MySqlDbProductContainer.save(req.body).
    MySqlDbProductContainer.close();
    res.json(data)
}

export const updateProduct  = async (req, res) => {
    let data = await MySqlDbProductContainer.updateProduct(req.params.id , req.body)
    MySqlDbProductContainer.close();
    res.json(data);
}

export const deleteProduct = (req, res) => {
    let data = await MySqlDbProductContainer.delete(req.params.id)
    MySqlDbProductContainer.close();
    res.json(data);
}