export default async function usuarioDTO(usuario) {
    const obj = {
        username: await usuario[0].username,
        password: await usuario[0].password
    }
    return obj
}

