// Archivo JavaScript principal para manejar interacciones y navegación

document.addEventListener("DOMContentLoaded", function () {
  // Maneja el clic en el enlace de registro para redirigir a register.html
  const registerLink = document.querySelector(".register-link");
  if (registerLink) {
    registerLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "register.html";
    });
  }

  const continue_button = document.querySelector("#continue_button");
  if (continue_button) {
    continue_button.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "forgot_2.html";
    });
  }

  const botonRegistrarse = document.querySelector("#Boton_Registrarse");
  if (botonRegistrarse) {
    botonRegistrarse.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "register_2.html";
    });
  }

  const botonContinuar = document.querySelector("#Boton_Continuar");
  if (botonContinuar) {
    botonContinuar.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "register_3.html";
    });
  }

  const botonTerminar = document.querySelector("#Boton_Terminar");
  if (botonTerminar) {
    botonTerminar.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }

  // Maneja el envío de formularios en páginas de login, registro y recuperación
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Redirige según la página actual
      if (window.location.pathname.endsWith("login.html")) {
        window.location.href = "index.html";
      } else if (window.location.pathname.endsWith("register.html")) {
        window.location.href = "login.html";
      } else if (window.location.pathname.endsWith("forgot.html")) {
        window.location.href = "forgot_2.html";
      } else if (window.location.pathname.endsWith("forgot_2.html")) {
        window.location.href = "forgot_3.html";
      } else if (window.location.pathname.endsWith("forgot_3.html")) {
        window.location.href = "login.html";
      }
    });
  }

  // Maneja el clic en el botón de cerrar sesión para redirigir a login.html
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      window.location.href = "login.html";
    });
  }

  // Manejo de la barra lateral y botón de despliegue
  const sidebarToggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");

  if (sidebarToggleBtn && sidebar && mainContent) {
    // Inicializa la barra lateral oculta por defecto
    sidebar.classList.add("sidebar-hidden");
    mainContent.style.marginLeft = "0";
    mainContent.style.width = "100%";
    sidebarToggleBtn.style.display = "block";

    // Al hacer clic en el botón, muestra la barra lateral y oculta el botón
    sidebarToggleBtn.addEventListener("click", function () {
      sidebar.classList.remove("sidebar-hidden");
      mainContent.style.marginLeft = "280px";
      mainContent.style.width = "calc(100% - 280px)";
      sidebarToggleBtn.style.display = "none";
    });

    // Al hacer clic en el contenido principal, oculta la barra lateral y muestra el botón
    mainContent.addEventListener("click", function (event) {
      if (!sidebar.classList.contains("sidebar-hidden")) {
        sidebar.classList.add("sidebar-hidden");
        mainContent.style.marginLeft = "0";
        mainContent.style.width = "100%";
        sidebarToggleBtn.style.display = "block";
      }
    });
  }

  // Maneja el clic en el botón de empezar sesión de concentración para redirigir a eventos.html
  const scheduleBtn = document.querySelector(".schedule-btn");
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", function () {
      window.location.href = "eventos.html";
    });
  }

  // Maneja el clic en el botón de explorar sonidos para redirigir a la carpeta música index.html
  const soundBtn = document.querySelector(".sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      window.location.href = "sonidos.html";
    });
  }
  const metodBtn = document.querySelector(".metod-btn");
  if (metodBtn) {
    metodBtn.addEventListener("click", function () {
      window.location.href = "Metodos Biblioteca.html";
    });
  }
});

// Menú Eventos:
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

//Crear Eventos
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

const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = document.getElementById("play-pause-icon");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");
const volumeSlider = document.getElementById("volume-slider");

// Actualiza la duración total cuando se carga el metadato
audio.addEventListener("loadedmetadata", () => {
  totalDurationDisplay.textContent = formatTime(audio.duration);
  progressBar.max = audio.duration;
});

// Actualiza el progreso de la canción
audio.addEventListener("timeupdate", () => {
  progressBar.value = audio.currentTime;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Reproduce o pausa la canción
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.src = "img/pausa.png"; // Cambia el icono a pausa
  } else {
    audio.pause();
    playPauseIcon.src = "img/reproducir.png"; // Cambia el icono a play
  }
});

// Cambia el progreso al mover el slider
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// Controla el volumen
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Formatea el tiempo en minutos:segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
