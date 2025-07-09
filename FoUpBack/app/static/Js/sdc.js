/**
 * Manejo de la sesión de concentración
 */

document.addEventListener('DOMContentLoaded', () => {
    const terminarBtn = document.querySelector('.botonTerminado');
    const progressCircle = document.querySelector('.progress-circle');

    // Crear el SVG para el círculo de progreso
    if (progressCircle) {
        const radius = 167;
        const circumference = 2 * Math.PI * radius;
        
        progressCircle.innerHTML = `
            <svg width="120" height="120" viewBox="0 0 350 350">
                <circle class="progress-ring__circle-bg"
                    cx="175" cy="175" r="${radius}"
                />
                <circle class="progress-ring__circle"
                    cx="175" cy="175" r="${radius}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${circumference}"
                />
            </svg>
            <div class="progress-text">0%</div>
        `;

        // Función para actualizar el progreso
        window.progressCircle = {
            setProgress: (percent) => {
                const circle = progressCircle.querySelector('.progress-ring__circle');
                const text = progressCircle.querySelector('.progress-text');
                const offset = circumference - (percent / 100 * circumference);
                circle.style.strokeDasharray = `${circumference}`;
                circle.style.strokeDashoffset = offset;
                text.textContent = `${percent}%`;
            }
        };
    }

    // Función para mostrar la notificación
    function showNotification() {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>¡Acabaste la sesión de concentración!</p>
            <button onclick="window.location.href='index.html'">Ver reporte</button>
        `;
        document.body.appendChild(notification);
        
        // Forzar un reflow para que la animación funcione
        notification.offsetHeight;
        
        // Mostrar la notificación
        notification.classList.add('show');
    }

    if (terminarBtn) {
        terminarBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Establecer progreso al 100%
            window.progressCircle.setProgress(100);

            // Guardar indicador de sesión completada
            localStorage.setItem('showSessionCompleteNotification', 'true');
            
            // Redirigir a index.html después de 1 segundo
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});