document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.concentration-btn');
    
    if (startButton) {
        startButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'sdc.html';
        });
    }
}); 
 