export default function usuarioDTO(usuario) {
    
    const obj = {
        username: usuario[0].username,
        password: usuario[0].password
    }
    return obj 
}

