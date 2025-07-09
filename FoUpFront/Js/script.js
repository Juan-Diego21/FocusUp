// Configuración de barra lateral y centrado de main
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mainContent = document.getElementById("mainContent");

  if (sidebar && sidebarToggle && mainContent) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      sidebar.classList.toggle("translate-x-0");
      if (sidebar.classList.contains("-translate-x-full")) {
        mainContent.classList.add("justify-center", "items-center");
        mainContent.classList.remove("ml-64");
      } else {
        mainContent.classList.remove("justify-center", "items-center");
        mainContent.classList.add("ml-64");
      }
    });

    // Estado inicial
    if (sidebar.classList.contains("-translate-x-full")) {
      mainContent.classList.add("justify-center", "items-center");
      mainContent.classList.remove("ml-64");
    }
  }

  // Menú desplegable y modal de confirmación
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const submenu = document.getElementById("submenu");
  const eliminarCuenta = document.getElementById("eliminarCuenta");
  const modalConfirm = document.getElementById("modalConfirm");
  const btnCancel = document.getElementById("btnCancel");
  const btnConfirm = document.getElementById("btnConfirm");

  if (dropdownBtn && submenu) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      submenu.classList.toggle("hidden");
    });
  }

  if (eliminarCuenta && modalConfirm) {
    eliminarCuenta.addEventListener("click", () => {
      modalConfirm.classList.remove("hidden");
    });
  }

  if (btnCancel && modalConfirm) {
    btnCancel.addEventListener("click", () => {
      modalConfirm.classList.add("hidden");
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => {
      // Aquí podrías añadir la lógica para eliminar los datos del usuario
      window.location.href = "login.html";
    });
  }

  // Cerrar el menú desplegable al hacer clic fuera
  document.addEventListener("click", () => {
    if (submenu) submenu.classList.add("hidden");
  });

  // Evitar que el clic en el submenú cierre el menú
  submenu?.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
