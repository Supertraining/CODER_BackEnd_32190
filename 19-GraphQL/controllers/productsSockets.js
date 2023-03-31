import ProductServices from "../services/products.js";
import logger from "../Logger/Logger.js";
import io from "../server.js";

export default class ProductsControllers {
    constructor() {
        this.productServices = new ProductServices();
    }
getAll = async () => {
    try {
        let productos = await this.productServices.getAll(); ;
        return productos;
    } catch (error) {
        logger.error(error)
    }
};

save = async (product) => {
    try {
        const productos = await this.productServices.save(product);
        io.sockets.emit('productos', productos);
    } catch (error) {
        logger.error(error)
    }
};

delete = async (id) => {
    try {
        let productos = await this.productServices.delete(id);
        io.sockets.emit('productos', productos);
    } catch (error) {
        logger.error(error)
    }
};

update = async (product) => {
    try {
        await this.productServices.update(product);
        let productos = await productContainer.getAll('productos');
        io.sockets.emit('productos', productos);
    } catch (error) {
        logger.error(error)
    }
};

getById = async (id) => {
    try {
        const producto = await this.productServices.getById(id);
        io.sockets.emit('selectedProd', producto);
    } catch (error) {
        logger.error(error)
    }
    }
}

