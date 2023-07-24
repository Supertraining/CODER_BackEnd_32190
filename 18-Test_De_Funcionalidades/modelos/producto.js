export default class Producto {
    #id
    #nombre
    #precio
    #imagen

    constructor({ id, nombre, precio, imagen }) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }

    get id() {
        return this.#id
    }
    set id(id) {
        if (!id) {
            throw new Error('El id es un campo requerido')
        }
        this.#id = id

    }

    get nombre() {
        return this.#nombre
    }
    set nombre(nombre) {
        if (!nombre) {
            throw new Error('El nombre es un campo requerido')
        }
        this.#nombre = nombre
    }

    get precio() {
        return this.#precio
    }
    set precio(precio) {
        if (!precio) {
            throw new Error('El precio es un campo requerido')
        }
        if (isNaN(precio)) {
            throw new Error('El precio debe ser un numero')
        }
        this.#precio = precio
    }

    get imagen() {
        return this.#imagen
    }
    set imagen(dni) {
        if (!dni) {
            throw new Error('Imagen es un campo requerido')
        }

        this.#imagen = dni
    }

    datos() {
        return JSON.parse(JSON.stringify({
            id: this.#id,
            nombre: this.#nombre,
            precio: this.#precio,
            imagen: this.#imagen
        }))
    }
}