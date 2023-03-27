import { Router } from "express";
import  ProductsController from "../controllers/products.js";
const router = Router();

export default class ProductsRoutes {
    constructor() {
        this.productController = new ProductsController();
    }   

start() {
    
    router.get('/', this.productController.getAll);
    router.post('/save', this.productController.save);
    router.get('/:id', this.productController.getById);
    router.delete('/:id', this.productController.delete);
    router.put('/update', this.productController.update);
    return router;
}
}