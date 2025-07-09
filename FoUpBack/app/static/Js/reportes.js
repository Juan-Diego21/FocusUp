document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos de los filtros
    const methodFilter = document.querySelector('.filter-select:first-of-type');
    const albumFilter = document.querySelector('.filter-select:last-of-type');
    const sessionCards = document.querySelectorAll('.session-card');
    const sidebarToggleBtn = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    // Función para crear el círculo de progreso
    function createProgressCircle(container) {
        const radius = 25;
        const circumference = 2 * Math.PI * radius;
        
        const progressCircle = document.createElement('div');
        progressCircle.className = 'card-progress-circle';
        
        progressCircle.innerHTML = `
            <svg viewBox="0 0 60 60">
                <circle class="card-progress-ring__circle-bg"
                    cx="30" cy="30" r="${radius}"
                />
                <circle class="card-progress-ring__circle"
                    cx="30" cy="30" r="${radius}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="0"
                />
            </svg>
            <div class="card-progress-text">100%</div>
        `;
        
        container.appendChild(progressCircle);
        
        // Establecer el progreso al 100%
        const circle = progressCircle.querySelector('.card-progress-ring__circle');
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = '0';
    }

    // Función para filtrar las sesiones
    function filterSessions() {
        const selectedMethod = methodFilter.value;
        const selectedAlbum = albumFilter.value;

        sessionCards.forEach(card => {
            const method = card.querySelector('h2').textContent;
            const album = card.querySelector('.album').textContent;

            const methodMatch = selectedMethod === 'all' || method.includes(selectedMethod);
            const albumMatch = selectedAlbum === 'all' || album.includes(selectedAlbum);

            if (methodMatch && albumMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Inicializar estado de la barra lateral
    if (sidebarToggleBtn && sidebar && mainContent) {
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

    // Agregar event listeners a los filtros
    if (methodFilter && albumFilter) {
        methodFilter.addEventListener('change', filterSessions);
        albumFilter.addEventListener('change', filterSessions);
    }

    // Agregar círculo de progreso a cada tarjeta
    sessionCards.forEach(card => {
        createProgressCircle(card);
        
        card.addEventListener('click', () => {
            // Aquí puedes agregar la lógica para mostrar los detalles de la sesión
            console.log('Sesión seleccionada:', card.querySelector('h2').textContent);
        });
    });

    // Agregar funcionalidad a los ítems de la barra lateral
    const menuItems = document.querySelectorAll('.settings-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent.trim();
            switch(text) {
                case 'Inicio':
                    window.location.href = 'index.html';
                    break;
                case 'Reportes':
                    window.location.href = 'reportes.html';
                    break;
                // Aquí puedes agregar más casos para otras páginas
                default:
                    console.log('Navegación no implementada para:', text);
            }
        });
    });
}); 