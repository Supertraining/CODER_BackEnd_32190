class ProductoDTO {
    constructor({ nombre, precio, imagen, id }) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    }
}

export function productoDTO(producto) {

    return producto.map((p) => new ProductoDTO(p))
   

}