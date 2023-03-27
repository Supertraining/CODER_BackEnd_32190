import ProductServices from "../services/products.js";
import logger from "../Logger/Logger.js";
import io from "../server.js";

export default class ProductsControllers {
    constructor() {
        this.productServices = new ProductServices();
    }
    getAll = async (req, res) => {
        try {
            let productos = await this.productServices.getAll();;
            if (res) {
                res.json(productos)
            }
            return productos
        } catch (error) {
            logger.error(error)
        }
    };

    save = async (req, res) => {
        try {

            const productId = await this.productServices.save(req.body);
            res.json(productId);
            const productos = await this.productServices.getById(productId);
            io.sockets.emit('productos', productos);
        } catch (error) {
            logger.error(error)
			console.log(error);

        }
    };

    delete = async (req, res) => {
        try {
            let productos = await this.productServices.delete(req.params.id);
            res.json(productos);
            io.sockets.emit('productos', productos);
        } catch (error) {
            logger.error(error)
        }
    };

    update = async (req, res) => {
        try {
            const updateProduct = req.body;
            const updatedProduct = await this.productServices.update(updateProduct);
            res.json(updatedProduct);
            io.sockets.emit('productos', updatedProduct);
        } catch (error) {
            logger.error(error)
        }
    };

    getById = async (req, res) => {
        try {
            const producto = await this.productServices.getById(req.params.id);
            res.json(producto);
            io.sockets.emit('selectedProd', producto);

        } catch (error) {
            logger.error(error)
        }
    }
}
