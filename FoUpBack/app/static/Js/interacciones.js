// JavaScript for albumes.html modal and localStorage interaction with backdrop blur

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const backdrop = document.getElementById('modal-backdrop');
    const eventList = document.getElementById('event-list');
    const noEvents = document.getElementById('no-events');
    const createEventBtn = document.getElementById('create-event-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const addAlbumButtons = document.querySelectorAll('.btn-add-album');

    function openModal() {
        modal.classList.remove('hidden');
        backdrop.classList.remove('hidden');
        loadEvents();
    }

    function closeModal() {
        modal.classList.add('hidden');
        backdrop.classList.add('hidden');
        clearEvents();
    }

    function clearEvents() {
        eventList.innerHTML = '';
        noEvents.classList.add('hidden');
    }

    function loadEvents() {
        clearEvents();
        const events = JSON.parse(localStorage.getItem('events')) || [];
        if (events.length === 0) {
            noEvents.classList.remove('hidden');
        } else {
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                eventItem.textContent = event.name || 'Evento sin nombre';
                eventList.appendChild(eventItem);
            });
        }
    }

    addAlbumButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    createEventBtn.addEventListener('click', () => {
        window.location.href = 'eventos.html';
    });

    // Close modal on clicking backdrop
    backdrop.addEventListener('click', closeModal);
});
