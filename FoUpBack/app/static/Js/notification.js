// notification.js
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('showSessionCompleteNotification') === 'true') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>¡Sesión completada con éxito!</p>
            <button onclick="this.parentNode.remove()">Cerrar</button>
        `;
        document.body.appendChild(notification);
        
        // Mostrar notificación con animación
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Configurar temporizador para ocultar
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        localStorage.removeItem('showSessionCompleteNotification');
    }
});