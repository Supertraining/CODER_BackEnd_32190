export default class Mensaje {

    #id
    #nombre
    #apellido
    #edad
    #alias
    #avatar
    #text

    constructor(obj) {
        this.nombre = obj.author.nombre
        this.apellido = obj.author.apellido
        this.edad = obj.author.edad
        this.id = obj.author.id
        this.alias = obj.author.alias
        this.avatar = obj.author.avatar
        this.text = obj.text
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

    get apellido() {
        return this.#apellido
    }
    set apellido(apellido) {
        if (!apellido) {
            throw new Error('El precio es un campo requerido')
        }
        this.#apellido = apellido
    }

    get edad() {
        return this.#edad
    }
    set edad(edad) {
        if (!edad) {
            throw new Error('La edad es un campo requerido')
        }
        if (isNaN(edad)) {
            throw new Error('La edad debe ser un numero')
        }
        this.#edad = edad
    }

    get avatar() {
        return this.#avatar
    }
    set avatar(avatar) {
        if (!avatar) {
            throw new Error('Imagen es un campo requerido')
        }

        this.#avatar = avatar
    }

    get text() {
        return this.#text
    }
    set text(text) {
        if (!text) {
            throw new Error('El texto es un campo requerido')
        }
        this.#text = text
    }

    datos() {
        return JSON.parse(JSON.stringify(
            {
                author:
                {
                    id: this.#id,
                    nombre: this.#nombre,
                    apellido: this.#apellido,
                    edad: this.#edad,
                    alias: this.#alias,
                    avatar: this.#avatar
                },
                text: this.#text
            }
        ))
    }
}


