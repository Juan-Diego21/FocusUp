let contadorBoton = 1;

function mostrarTexto() {
  // Elementos del primer paso
  const segundoTexto = document.getElementById("segundoTexto");
  const TercerTexto = document.getElementById("TercerTexto");
  const contenedorTimer25 = document.getElementById("contenedor-timer-25");

  // Elementos del segundo paso
  const tercerTextoTextoDos = document.getElementById("tercerTextoTextoDos");
  const parafoTextoDos = document.getElementById("parafoTextoDos");
  const contenedorTimer5 = document.getElementById("contenedor-timer-5");

  // Botón final
  const Botonterminado = document.getElementById("Botonterminado");

  // Elemento de la línea
  const linea = document.querySelector('.linea');

  // Función para mostrar elementos con transición
  function mostrarElemento(elemento) {
    // Primero hacemos visible el elemento pero con opacidad 0
    elemento.style.display = 'block';
    // Forzamos un reflow para que la transición funcione
    elemento.offsetHeight;
    // Removemos la clase oculto para iniciar la transición
    elemento.classList.remove("oculto");
  }

  if (contadorBoton === 1) {
    // Mostrar primer paso con el temporizador de 25 minutos
    mostrarElemento(segundoTexto);
    setTimeout(() => mostrarElemento(TercerTexto), 200);
    setTimeout(() => mostrarElemento(contenedorTimer25), 400);
    
    // Iniciar el temporizador de 25 minutos
    window.timer25.reset();
    window.timer25.start();
    // Animar la línea hasta el segundo punto
    linea.className = 'linea paso-2';
    contadorBoton = 2;
  } 
  else if (contadorBoton === 2) {
    // Detener el temporizador de 25 minutos si aún está corriendo
    window.timer25.stop();
    
    // Mostrar segundo paso con el temporizador de 5 minutos
    mostrarElemento(tercerTextoTextoDos);
    setTimeout(() => mostrarElemento(parafoTextoDos), 200);
    setTimeout(() => mostrarElemento(contenedorTimer5), 400);
    
    // Iniciar el temporizador de 5 minutos
    window.timer5.reset();
    window.timer5.start();
    // Animar la línea hasta el tercer punto
    linea.className = 'linea paso-3';
    contadorBoton = 3;
  }
  else if (contadorBoton === 3) {
    // Detener el temporizador de 5 minutos si aún está corriendo
    window.timer5.stop();
    // Mostrar botón de terminar con transición
    mostrarElemento(Botonterminado);
    // Reiniciar la línea para el próximo ciclo
    linea.className = 'linea paso-1';
    contadorBoton = 1;
  }
}

// Agregar manejadores de eventos para los botones de reinicio
document.addEventListener('DOMContentLoaded', () => {
  const resetButton25 = document.querySelector('#minutos').nextElementSibling;
  const resetButton5 = document.querySelector('#minutosDos').nextElementSibling;
  const linea = document.querySelector('.linea');

  // Inicializar la línea en su estado inicial
  linea.className = 'linea paso-1';

  resetButton25.addEventListener('click', () => {
    window.timer25.reset();
  });

  resetButton5.addEventListener('click', () => {
    window.timer5.reset();
  });
});