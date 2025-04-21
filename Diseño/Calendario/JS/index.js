function cargarEventos() {
    const contenedor = document.getElementById("listaEventos");
    contenedor.innerHTML = "";

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.forEach((evento, index) => {

        const div = document.createElement("div");
        div.className = "evento";
        div.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>${evento.fecha} - ${evento.hora}</p>
        <p>${evento.descripcion}</p>
        <button onclick="editarEvento(${index})">Editar</button>
        <button onclick="eliminarEvento(${index})">Eliminar</button>
    `;

    contenedor.appendChild(div);
    });
}

function editarEvento(index) {
    localStorage.setItem("editarIndex", index);
    window.location.href = "crear-evento.html";
}

function eliminarEvento(index) {
    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    eventos.splice(index, 1);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    cargarEventos();
}

cargarEventos();