/**
 * Utilidades comunes para toda la aplicación
 */

// Formatear tiempo en minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Redirigir a otra página con un retraso opcional
function redirectWithDelay(url, delay = 0) {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

// Guardar datos en localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

// Obtener datos de localStorage
function getFromStorage(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

// Remover datos de localStorage
function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Manejar la visibilidad de elementos
function toggleVisibility(element, show) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) {
        element.classList.toggle('oculto', !show);
        element.classList.toggle('visible', show);
    }
} 