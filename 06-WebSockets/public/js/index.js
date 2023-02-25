const socket = io();

function addProduct() {
	const producto = {
		nombre: document.getElementById('nombre').value,
		precio: document.getElementById('precio').value,
		imagen: document.getElementById('imagen').value,
	};
	socket.emit('new-product', producto);
	return false;
}

socket.on('productos', (data) => {
	if (data.length === 0) {
		document.getElementById('tabla').innerHTML = `
						<h3 class="m-2 text-white">no se encontraron datos</h3>
					`;
	} else {
		const html = data
			.map((el) => {
				return `    <tr>
                            <td>${el.nombre}</td>
                            <td>${el.precio}</td>
                            <td><img src=${el.imagen}></td>
                            </tr><br>
                        `;
			})
			.join(' ');

		document.getElementById('tabla').innerHTML = html;
	}
});

function addMessage() {
	const message = {
		email: document.getElementById('email').value,
		text: document.getElementById('text').value,
	};
	socket.emit('new-message', message);
	return false;
}

socket.on('messages', (data) => {
	const html = data
		.map((msj) => {
			return `<div class="m-1 shadow">
                    <strong style="color:blue;">${msj.email}</strong>
                    <p style="color:brown;" class="m-0">${new Date().toLocaleString()}</p>
                    <i style="color:green;">${msj.text}</i>
                </div>`;
		})
		.join(' ');

	document.getElementById('messages').innerHTML = html;
});
