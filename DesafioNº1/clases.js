class usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        console.log(`El nombre de usuario es ${this.apellido} ${this.nombre} `);
    }
    addMascotas(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        console.log(`El usuario tiene ${this.mascotas.length} mascotas`);
    }
    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }
    getBookNames() {
        const booknames = this.libros.map(el => el.nombre );
        console.log(booknames);
    }
}

let usuarioUno = new usuario('Matías', 'Maranga', [{nombre:'El señor de los anillos', autor: 'J.R.R Tolkien'}, {nombre:'El codigo Da Vinci', autor: 'Dan Brown'}], ['Gata', 'Pescadito']);

usuarioUno.getFullName();
usuarioUno.addMascotas('Murcielago');
usuarioUno.countMascotas();
usuarioUno.addBook('Africa. Tormenta de libertad', 'H. Lanvers');
usuarioUno.getBookNames();