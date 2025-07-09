// Funciones de utilidad para el manejo del localStorage
function getFromStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Obtener elementos del formulario
const form = document.getElementById("formEvento");
const indexEditar = localStorage.getItem("editarIndex");

// Si estamos editando un evento, cargar sus datos
if (indexEditar !== null) {
    const eventos = getFromStorage("eventos");
    const evento = eventos[indexEditar];

    if (evento) {
        document.getElementById("titulo").value = evento.titulo;
        document.getElementById("fecha").value = evento.fecha;
        document.getElementById("hora").value = evento.hora;
        document.getElementById("descripcion").value = evento.descripcion;
        document.getElementById("eventoId").value = indexEditar;
        document.getElementById("tituloFormulario").textContent = "Editar Evento";
    }
}

// Manejar el envío del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nuevoEvento = {
        titulo: document.getElementById("titulo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        descripcion: document.getElementById("descripcion").value,
        metodoEstudio: "", // Se puede implementar más tarde
        sonido: "" // Se puede implementar más tarde
    };

    let eventos = getFromStorage("eventos");
    const id = document.getElementById("eventoId").value;

    if (id) {
        // Estamos editando un evento existente
        eventos[id] = nuevoEvento;
        localStorage.removeItem("editarIndex");
    } else {
        // Estamos creando un nuevo evento
        eventos.push(nuevoEvento);
    }

    saveToStorage("eventos", eventos);
    window.location.href = "eventos.html";
});

// Manejar los botones adicionales
document.getElementById("btn-añadir-mde").addEventListener("click", () => {
    // Aquí se puede implementar la funcionalidad para añadir método de estudio
    console.log("Añadir método de estudio");
});

document.getElementById("btn-añadir-s").addEventListener("click", () => {
    // Aquí se puede implementar la funcionalidad para añadir sonido
    console.log("Añadir sonido");
});