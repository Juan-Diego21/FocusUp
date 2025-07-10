/**
 * Manejo del círculo de progreso
 */

class ProgressCircle {
    constructor() {
        this.circle = document.querySelector('.progress-ring__circle');
        this.text = document.querySelector('.progress-text');
        this.circumference = 326.726; // 2 * π * 52 (radio)
    }

    // Inicializar el progreso desde localStorage
    initialize() {
        if (!this.circle || !this.text) return;
        const progress = getFromStorage('progressValue', '0');
        this.setProgress(parseInt(progress));
    }

    // Establecer el progreso actual
    setProgress(percent) {
        if (!this.circle || !this.text) return;
        
        // Asegurar que el porcentaje esté entre 0 y 100
        percent = Math.min(100, Math.max(0, percent));
        
        // Calcular el desplazamiento del trazo
        const offset = this.circumference - (percent / 100 * this.circumference);
        
        // Actualizar el círculo y el texto
        this.circle.style.strokeDashoffset = offset;
        this.text.textContent = `${percent}%`;
        
        // Guardar en localStorage
        saveToStorage('progressValue', percent.toString());
    }
}

// Crear e inicializar el círculo de progreso cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const progressCircle = new ProgressCircle();
    progressCircle.initialize();
    
    // Hacer disponible globalmente
    window.progressCircle = progressCircle;
}); 