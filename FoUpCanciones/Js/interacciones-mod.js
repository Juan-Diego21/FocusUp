// Modified JavaScript for albumes.html modal and biblioteca.html method selection

document.addEventListener("DOMContentLoaded", () => {
  // Album modal elements
  const modal = document.getElementById("modal");
  const backdrop = document.getElementById("modal-backdrop");
  const eventList = document.getElementById("event-list");
  const noEvents = document.getElementById("no-events");
  const createEventBtn = document.getElementById("create-event-btn");
  const closeModalBtn = document.getElementById("close-modal");
  const addAlbumButtons = document.querySelectorAll(".btn-add-album");
  const albumCards = document.querySelectorAll(".clickable-album");

  // Biblioteca method selection elements
  const methodButtons = document.querySelectorAll(".btn-toggle-method");

  // Load selected methods from localStorage or initialize empty array
  let selectedMethods =
    JSON.parse(localStorage.getItem("selectedMethods")) || [];

  // Update method button images based on selection state
  function updateMethodButtons() {
    methodButtons.forEach((btn) => {
      const method = btn.getAttribute("data-method");
      if (selectedMethods.includes(method)) {
        btn.src = "img/eliminar.png";
        btn.alt = "Eliminar método";
      } else {
        btn.src = "img/mas.png";
        btn.alt = "Añadir método";
      }
    });
  }

  // Toggle method selection on button click
  methodButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const method = btn.getAttribute("data-method");
      if (method === "Metodo Pomodoro") {
        // Redirect to metoPomodoro.html for Metodo Pomodoro
        window.location.href = "metoPomodoro.html";
        return;
      }
      const index = selectedMethods.indexOf(method);
      if (index === -1) {
        selectedMethods.push(method);
      } else {
        selectedMethods.splice(index, 1);
      }
      localStorage.setItem("selectedMethods", JSON.stringify(selectedMethods));
      updateMethodButtons();
    });
  });

  updateMethodButtons();

  // Album modal functions
  function openModal() {
    modal.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    loadEvents();
  }

  function closeModal() {
    modal.classList.add("hidden");
    backdrop.classList.add("hidden");
    clearEvents();
  }

  function clearEvents() {
    eventList.innerHTML = "";
    noEvents.classList.add("hidden");
  }

  function loadEvents() {
    clearEvents();
    const events = JSON.parse(localStorage.getItem("events")) || [];
    if (events.length === 0) {
      noEvents.classList.remove("hidden");
    } else {
      events.forEach((event) => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");
        eventItem.textContent = event.name || "Evento sin nombre";
        eventList.appendChild(eventItem);
      });
    }
  }

  // Open modal on clicking "Añadir álbum a métodos de estudio" buttons
  addAlbumButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering album card click
      openModal();
    });
  });

  // Redirect to sonidos.html on clicking album card (excluding the button)
  albumCards.forEach((card) => {
    card.addEventListener("click", () => {
      const albumName = card.getAttribute("data-album");
      window.location.href = `sonidos.html?album=${albumName}`;
    });
  });

  closeModalBtn.addEventListener("click", closeModal);

  createEventBtn.addEventListener("click", () => {
    window.location.href = "crear-evento.html";
  });

  // Close modal on clicking backdrop
  backdrop.addEventListener("click", closeModal);
});
