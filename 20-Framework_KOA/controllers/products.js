import ProductServices from "../services/products.js";
import logger from "../Logger/Logger.js";
import io from "../server.js";


export default class ProductsControllers {
    constructor() {
        this.productServices = new ProductServices();
    }
    getAll = async (ctx) => {
        try {
            let productos = await this.productServices.getAll();;
            if (ctx.response) {
                ctx.body = { productos: productos };
            }
            return productos
        } catch (error) {
            logger.error(error)
        }
    };

    save = async (ctx) => {
        try {

            const productId = await this.productServices.save(ctx.request.body);
            ctx.body = { productId: productId };
            const productos = await this.productServices.getById(productId);
            io.sockets.emit('productos', productos);
        } catch (error) {
            logger.error(error)
			console.log(error);

        }
    };

    delete = async (ctx) => {
        try {
            let productos = await this.productServices.delete(ctx.params.id);
            ctx.body = { productos: productos };
            io.sockets.emit('productos', productos);
        } catch (error) {
            logger.error(error)
        }
    };

    update = async (ctx) => {
        try {
            const updateProduct = ctx.request.body;
            const updatedProduct = await this.productServices.update(updateProduct);
            ctx.body = { updatedProduct : updatedProduct };
            io.sockets.emit('productos', updatedProduct);
        } catch (error) {
            logger.error(error)
        }
    };

    getById = async (ctx) => {
        try {
            const producto = await this.productServices.getById(ctx.params.id);
            ctx.body = { producto : producto };
            io.sockets.emit('selectedProd', producto);

        } catch (error) {
            logger.error(error)
        }
    }
}
