let contadorBoton = 1;

function mostrarTexto() {
  const segundoTexto = document.getElementById("segundoTexto");
  const TercerTexto = document.getElementById("TercerTexto");
  const minutos = document.getElementById("minutos");
  const pare = document.getElementById("pare");
  const repetir = document.getElementById("repetir");
  const cuartoTexto = document.getElementById("cuartoTexto");

  // Tercer parrafo 

   const tercerTextoTextoDos = document.getElementById("tercerTextoTextoDos");
   const parafoTextoDos = document.getElementById("parafoTextoDos");
   const minutosDos = document.getElementById("minutosDos");
   const paraDos = document.getElementById("pareDos");
   const repetirDos = document.getElementById("repetirDos");

  //Botno final
   var Botonterminado = document.getElementById("Botonterminado");
  if (contadorBoton === 1) {
    // Mostrar los primeros textos y temporizador
    segundoTexto.classList.remove("oculto");
    segundoTexto.classList.add("visible");

    TercerTexto.classList.remove("oculto");
    TercerTexto.classList.add("visible");

    minutos.classList.remove("oculto");
    minutos.classList.add("visible");

    pare.classList.remove("oculto");
    pare.classList.add("visible");

    repetir.classList.remove("oculto");
    repetir.classList.add("visible");

    cuartoTexto.classList.remove("oculto");
    cuartoTexto.classList.add("visible")

  } 
  else if (contadorBoton === 2) {
    // Ocultamos la clasede tiempo
    minutos.classList.add("oculto");
    minutos.classList.remove("visible");

    pare.classList.add("oculto");
    pare.classList.remove("visible");

    repetir.classList.add("oculto");
    repetir.classList.remove("visible");

    cuartoTexto.classList.add("oculto");
    cuartoTexto.classList.remove("visible");

    // Por si no los muestra usar este codigo 
    
    //segundoTexto.classList.add("visible");
    //segundoTexto.classList.remove("oculto");
""
    //TercerTex"""""""
    // "t"''"o.classList.add("visible");
    //TercerTexto.classList.remove("oculto");

    tercerTextoTextoDos.classList.remove("oculto");
    tercerTextoTextoDos.classList.add("visible");
    
    parafoTextoDos.classList.remove("ocuto");
    parafoTextoDos.classList.add("visible");
    

    // Botones
    minutosDos.classList.remove("oculto");
    minutosDos.classList.add("visible");
   
    paraDos.classList.remove("oculto");
    paraDos.classList.add("visible");
    
    repetirDos.classList.remove("oculto");
    repetirDos.classList.add("visible");
    

  }else if( contadorBoton===3){
    Botonterminado.classList.remove("oculto");
    Botonterminado.classList.add("visible");
    }

  contadorBoton++;
}