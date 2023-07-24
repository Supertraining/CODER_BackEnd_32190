import ProductServices from '../services/products.js';
import logger from '../Logger/Logger.js';
import io from '../server.js';

export default class ProductsControllers {
    constructor() {
        this.productServices = new ProductServices();
    }
    getAll = async (req, res) => {
        try {
            let productos = await this.productServices.getAll();
            io.sockets.emit('productos', productos);
            
            res?.json(productos);
            
        } catch (error) {
            logger.error(error);
        }
    };

    save = async (req, res) => {
        try {
            const productId = await this.productServices.save(req.body ? req.body : req);
            const producto = await this.productServices.getById(productId);
            res?.json(producto);
        } catch (error) {
            logger.error(error);
        }
    };

    delete = async (req, res) => {
        try {
            let productos = await this.productServices.delete(isNaN(req) ? req.params.id : req);
            io.sockets.emit('productos', productos);
            res?.json(productos);
        } catch (error) {
            logger.error(error);
        }
    };

    update = async (req, res) => {
        try {

            const updatedProduct = await this.productServices.update(req.body ? req.body : req);
            io.sockets.emit('productos', updatedProduct);
            res?.json(updatedProduct)
        } catch (error) {
            logger.error(error);
        }
    };

    getById = async (req, res) => {
        try {
            const producto = await this.productServices.getById(isNaN(req) ? req.params.id : req);

            io.sockets.emit('selectedProd', producto);

            res?.json(producto);

        } catch (error) {
            console.log(error);
            logger.error(error);
        }
    };
}
