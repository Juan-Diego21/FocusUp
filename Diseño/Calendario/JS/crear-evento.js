const form = document.getElementById("formEvento");
const indexEditar = localStorage.getItem("editarIndex");

if (indexEditar !== null) {
    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];
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

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nuevoEvento = {

        titulo: document.getElementById("titulo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        descripcion: document.getElementById("descripcion").value
    };



    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    const id = document.getElementById("eventoId").value;

    if (id) {

        eventos[id] = nuevoEvento;
        localStorage.removeItem("editarIndex");
    } else {

        eventos.push(nuevoEvento);
    }

localStorage.setItem("eventos", JSON.stringify(eventos));
window.location.href = "index.html";

});