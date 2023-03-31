// export function mensajeDTO(mensaje) {
//   if (mensaje.length > 0) {
//     return mensaje.map(p => p)
//   }
//   return mensaje
// }

class MensajeDTO {
  constructor(obj) {
    this.nombre = obj.author.nombre
    this.apellido = obj.author.apellido
    this.edad = obj.author.edad
    this.id = obj.author.id
    this.alias = obj.author.alias
    this.avatar = obj.author.avatar
    this.text = obj.text
  }
  
  datos() {
    return JSON.parse(JSON.stringify(
        {
            author:
            {
                id: this.id,
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                alias: this.alias,
                avatar: this.avatar
            },
            text: this.text
        }
    ))
}
}

export function mensajeDTO(mensaje) {

  return mensaje.map((m) => new MensajeDTO(m).datos())

}