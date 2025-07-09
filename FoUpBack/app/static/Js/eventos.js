// Funciones de utilidad para el manejo del localStorage
function getFromStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Función para cargar y mostrar los eventos
function cargarEventos() {
    const contenedor = document.getElementById("listaEventos");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    const eventos = getFromStorage("eventos");

    if (eventos.length === 0) {
        contenedor.innerHTML = "<p>No hay eventos programados</p>";
        return;
    }

    eventos.forEach((evento, index) => {
        const div = document.createElement("div");
        div.className = "evento";
        
        // Formatear la fecha para mostrarla
        const fecha = new Date(evento.fecha);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        div.innerHTML = `
            <h3>${evento.titulo}</h3>
            <p>${fechaFormateada} - ${evento.hora}</p>
            <p>${evento.descripcion}</p>
            <div class="evento-botones">
                <button onclick="editarEvento(${index})" class="btn-editar">Editar</button>
                <button onclick="eliminarEvento(${index})" class="btn-eliminar">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// Función para editar un evento
function editarEvento(index) {
    saveToStorage("editarIndex", index);
    window.location.href = "crear-evento.html";
}

// Función para eliminar un evento
function eliminarEvento(index) {
    const eventos = getFromStorage("eventos");
    eventos.splice(index, 1);
    saveToStorage("eventos", eventos);
    cargarEventos();
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', () => {
    cargarEventos();
}); 