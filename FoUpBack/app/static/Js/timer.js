class Timer {
    constructor(elementId, duration) {
        const container = document.getElementById(elementId);
        this.element = container.querySelector('.timer');
        this.duration = duration;
        this.timeLeft = duration;
        this.interval = null;
        this.isRunning = false;
        
        // Obtener los botones
        const buttons = container.querySelectorAll('.timer-button');
        this.resetButton = buttons[0];
        this.pauseButton = buttons[1];
        
        // Configurar eventos de los botones
        this.resetButton.addEventListener('click', () => {
            this.reset();
            this.start(); // Reiniciar automáticamente después de reset
        });
        
        this.pauseButton.addEventListener('click', () => {
            if (this.isRunning) {
                this.stop();
                this.pauseButton.querySelector('img').src = 'img/reproducir.png';
            } else {
                this.start();
                this.pauseButton.querySelector('img').src = 'img/boton-de-pausa.png';
            }
        });
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.stop();
                    this.pauseButton.querySelector('img').src = 'img/reproducir.png';
                }
            }, 1000);
        }
    }

    stop() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
        }
    }

    reset() {
        this.stop();
        this.timeLeft = this.duration;
        this.updateDisplay();
        this.pauseButton.querySelector('img').src = 'img/boton-de-pausa.png';
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.element.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Crear instancias de los temporizadores
const timer25 = new Timer('minutos', 25 * 60); // 25 minutos
const timer5 = new Timer('minutosDos', 5 * 60); // 5 minutos

// Hacer los temporizadores disponibles globalmente
window.timer25 = timer25;
window.timer5 = timer5; 