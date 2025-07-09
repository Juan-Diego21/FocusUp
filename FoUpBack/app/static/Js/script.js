/**
 * Archivo JavaScript principal para manejar interacciones y navegación
 */

document.addEventListener("DOMContentLoaded", () => {
    // Configurar manejadores de navegación
    setupNavigationHandlers();
    
    // Configurar barra lateral
    setupSidebar();
    
    // Configurar reproductor de audio
    setupAudioPlayer();
    
    // Configurar menú desplegable y modal
    setupDropdownAndModal();
    
    // Cargar eventos si estamos en la página correspondiente
    if (document.getElementById("listaEventos")) {
        cargarEventos();
    }
});

// Configurar manejadores de navegación
function setupNavigationHandlers() {
    // Mapeo de botones a URLs
    const navigationMap = {
        
        
       
    };

    // Configurar cada botón
    Object.entries(navigationMap).forEach(([selector, url]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Si es el botón de concentración, reiniciar progreso
                if (selector === '.concentration-btn') {
                    saveToStorage('progressValue', '0');
                }
                
                window.location.href = url;
            });
        }
    });

    // Manejar formularios
    const loginForm = document.querySelector(".login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", handleFormSubmit);
    }
}

// Manejar envío de formularios
function handleFormSubmit(event) {
    event.preventDefault();
    const currentPath = window.location.pathname;
    
    
    const redirectMap = {
     
    };

    const targetPage = Object.entries(redirectMap)
        .find(([key]) => currentPath.endsWith(key))?.[1];

    if (targetPage) {
        window.location.href = targetPage;
    }
}

// Configurar barra lateral
function setupSidebar() {
    const sidebarToggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (!sidebarToggleBtn || !sidebar || !mainContent) return;

    // Inicializar estado
    sidebar.classList.add("sidebar-hidden");
    mainContent.style.marginLeft = "0";
    mainContent.style.width = "100%";
    sidebarToggleBtn.style.display = "block";

    // Mostrar barra lateral
    sidebarToggleBtn.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-hidden");
        mainContent.style.marginLeft = "280px";
        mainContent.style.width = "calc(100% - 280px)";
        sidebarToggleBtn.style.display = "none";
    });

    // Ocultar barra lateral
    mainContent.addEventListener("click", () => {
        if (!sidebar.classList.contains("sidebar-hidden")) {
            sidebar.classList.add("sidebar-hidden");
            mainContent.style.marginLeft = "0";
            mainContent.style.width = "100%";
            sidebarToggleBtn.style.display = "block";
        }
    });
}

// Configurar reproductor de audio
function setupAudioPlayer() {
    const audio = document.getElementById("audio");
    if (!audio) return;

    const elements = {
        playPauseBtn: document.getElementById("play-pause-btn"),
        playPauseIcon: document.getElementById("play-pause-icon"),
        progressBar: document.getElementById("progress-bar"),
        currentTime: document.getElementById("current-time"),
        totalDuration: document.getElementById("total-duration"),
        volumeSlider: document.getElementById("volume-slider")
    };

    // Actualizar duración total
    audio.addEventListener("loadedmetadata", () => {
        elements.totalDuration.textContent = formatTime(audio.duration);
        elements.progressBar.max = audio.duration;
    });

    // Actualizar progreso
    audio.addEventListener("timeupdate", () => {
        elements.progressBar.value = audio.currentTime;
        elements.currentTime.textContent = formatTime(audio.currentTime);
    });

    // Reproducir/Pausar
    elements.playPauseBtn?.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            elements.playPauseIcon.src = "img/pausa.png";
        } else {
            audio.pause();
            elements.playPauseIcon.src = "img/reproducir.png";
        }
    });

    // Control de progreso
    elements.progressBar?.addEventListener("input", () => {
        audio.currentTime = elements.progressBar.value;
    });

    // Control de volumen
    elements.volumeSlider?.addEventListener("input", () => {
        audio.volume = elements.volumeSlider.value;
    });
}

// Gestión de eventos
function cargarEventos() {
    const contenedor = document.getElementById("listaEventos");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    const eventos = getFromStorage("eventos", []);

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

// Funciones para manejo de eventos
window.editarEvento = function(index) {
    saveToStorage("editarIndex", index);
    window.location.href = "crear-evento.html";
};

window.eliminarEvento = function(index) {
    const eventos = getFromStorage("eventos", []);
    eventos.splice(index, 1);
    saveToStorage("eventos", eventos);
    cargarEventos();
};

// Crear Eventos
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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevoEvento = {
    titulo: document.getElementById("titulo").value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    descripcion: document.getElementById("descripcion").value,
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

// Formatea el tiempo en minutos:segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Configurar menú desplegable y modal
function setupDropdownAndModal() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const submenu = document.querySelector('.submenu');
    const eliminarCuenta = document.getElementById('eliminarCuenta');
    const modalConfirm = document.getElementById('modalConfirm');
    const btnCancel = document.getElementById('btnCancel');
    const btnConfirm = document.getElementById('btnConfirm');

    if (dropdownBtn && submenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownBtn.classList.toggle('active');
            submenu.classList.toggle('active');
        });
    }

    if (eliminarCuenta && modalConfirm) {
        eliminarCuenta.addEventListener('click', () => {
            modalConfirm.classList.add('active');
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            modalConfirm.classList.remove('active');
        });
    }

    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            // Aquí podrías añadir la lógica para eliminar los datos del usuario
            window.location.href = 'login.html';
        });
    }

    // Cerrar el menú desplegable al hacer clic fuera
    document.addEventListener('click', () => {
        if (dropdownBtn && submenu) {
            dropdownBtn.classList.remove('active');
            submenu.classList.remove('active');
        }
    });

    // Evitar que el clic en el submenú cierre el menú
    submenu?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}