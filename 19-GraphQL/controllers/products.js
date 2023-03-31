import ProductServices from "../services/products.js";
import logger from "../Logger/Logger.js";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { log } from "util";

const schema = buildSchema(`
type Product {
    id: ID!,
    nombre: String!,
    precio: Float!,
    imagen: String!
}
input ProductInput {
    nombre: String!,
    precio: Float!,
    imagen: String!
}
type Query {
    getAll: [Product]
    getById(id: ID!): [Product]
}
type Mutation {
    save(product: ProductInput): Int 
    update(id: ID!,product: ProductInput): Product
    delete(id: ID!): Int
}
`)

export default class Products {
    constructor() {
        this.productServices = new ProductServices();
    }
    getAll = async (req, res) => {
        try {
            let productos = await this.productServices.getAll();
            res.json(productos) 
        } catch (error) {
            logger.error(error)
        }
    };

    save = async (req, res) => {
        try {

            const productId = await this.productServices.save(req.body);
            res.json(productId);
        } catch (error) {
            logger.error(error)
            console.log(error);
        }
    };

    delete = async (req, res) => {
        try {
            let productos = await this.productServices.delete(req.params.id);
            res.json(productos);
        } catch (error) {
            logger.error(error)
        }
    };

    update = async (req, res) => {
        try {
            console.log(req.body);
            const updateProduct = req.body;
            const updatedProduct = await this.productServices.update(updateProduct);
            res.json(updatedProduct);
        } catch (error) {
            logger.error(error)
        }
    };

    getById = async (req, res) => {
        try {
            const producto = await this.productServices.getById(req.params.id);
            res.json(producto);
        } catch (error) {
            logger.error(error)
        }
    }

    startGraphQL() {
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAll: this.productServices.getAll(),
                getById: this.productServices.getById,
                save: this.productServices.save,
                update: this.productServices.update,
                delete: this.productServices.delete
            },
            graphiql: true
        })
    }
}



