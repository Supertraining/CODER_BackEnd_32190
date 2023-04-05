import { strictEqual, deepStrictEqual } from "assert";
import { expect } from "chai";
import axios from 'axios'

async function getProducts() {
    const data = await axios('http://localhost:8080/products')
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}

async function addProduct(producto) {
    const data = await axios.post('http://localhost:8080/products/save', { ...producto })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    };
}

async function getById(id) {
    const { data } = await axios(`http://localhost:8080/products/${id}`)
    return data[0];
}
async function deleteById(id) {
    const data = await axios.delete(`http://localhost:8080/products/${id}`)
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}

async function updateByid(producto) {
    const data = await axios.put('http://localhost:8080/products/update', {
       ...producto
    })
    return {
        status: data.status,
        statusText: data.statusText,
        data: data.data
    }
}


describe("Comprobando el funcionamiento del servidor", function () {

    before(function () {
        console.log('********* Comienzo TOTAL de Test *********')
    })

    after(function () {
        console.log('********* Fin TOTAL de Test *********')
    })

    beforeEach(function () {
        console.log('********* Comienzo Test *********')
    })

    afterEach(function () {
        console.log('********* Fin Test *********')
    })
    it("Recibir todos los productos", async function () {
        const respuesta = await getProducts()
        expect(respuesta.status).to.equal(200)
        expect(respuesta.data).to.be.an('array')
    })
    it("Guardar 1 producto y recibir 1 producto", async function () {
        const producto = {
            nombre: 'productoDePrueba',
            precio: 100,
            imagen: 'prueba12.jpg',
        }
        const respuesta = await addProduct(producto)
        const data = await getById(respuesta.data)

        expect(respuesta.status).to.equal(200)
        expect(respuesta.statusText).to.equal('OK')
        expect(data).to.deep.equal({ id: respuesta.data, nombre: 'productoDePrueba', precio: 100, imagen: 'prueba12.jpg' })
    })
    it("Eliminar un producto", async function () {
        const deleteRes = await deleteById(94)

        expect(deleteRes.status).to.equal(200)
        expect(deleteRes.statusText).to.equal('OK')
    })
    it("Actualizar un producto", async function () {
        const product = {
            nombre: 'producto updated',
            precio: 200,
            imagen: 'pruebaUpdated.jpg',
            id: 106
        }
        const updateRes = await updateByid(product)

        expect(updateRes.status).to.equal(200);
        expect(updateRes.statusText).to.equal('OK');
        expect(updateRes.data).to.deep.equal({ nombre: 'producto updated', precio: 200, imagen: 'pruebaUpdated.jpg', id: 106 })
    })

})