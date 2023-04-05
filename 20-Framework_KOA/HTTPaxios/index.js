import axios from "axios";

async function getProducts() {
    const { data } = await axios('http://localhost:8080/products')
    return data;
}

async function addProduct() {
    const data = await axios.post('http://localhost:8080/products/save', {
        nombre: 'producto',
        precio: 100,
        imagen: 'prueba1.jpg',
    })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}

async function getById() {
    const data = await axios('http://localhost:8080/products/105')
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}
async function deleteById() {
    const data = await axios.delete('http://localhost:8080/products/102')
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}


async function updateByid() {
    const data = await axios.put('http://localhost:8080/products/update', {
        nombre: 'producto updated',
        precio: 200,
        imagen: 'pruebaUpdated.jpg',
        id: 105
    })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}


const getAllProducts = await getProducts()
console.log('-----> Obtener todos los productos');
console.log(getAllProducts);

const addProducto = await addProduct()
console.log('-----> Agregar un producto');
console.log(addProducto);

const getProductById = await getById()
console.log('-----> Obtener un producto por id');
console.log(getProductById);


const deleteProductById = await deleteById()
console.log('-----> Eliminar un producto por id');
console.log(deleteProductById);

const updateProduct = await updateByid()
console.log('-----> Actualizar un producto por id');
console.log(updateProduct);
