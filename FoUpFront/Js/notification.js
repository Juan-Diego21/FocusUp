document.addEventListener('DOMContentLoaded', () => {
    // Verificar si debemos mostrar la notificación
    if (localStorage.getItem('showSessionCompleteNotification') === 'true') {
        // Crear y mostrar la notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>¡Acabaste la sesión de concentración!</p>
            <button onclick="window.location.href='reportes.html'">Ver reporte</button>
        `;
        document.body.appendChild(notification);
        
        // Forzar un reflow para que la animación funcione
        notification.offsetHeight;
        
        // Mostrar la notificación
        notification.classList.add('show');
        
        // Remover el indicador de localStorage
        localStorage.removeItem('showSessionCompleteNotification');
        
        // Ocultar la notificación después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}); 