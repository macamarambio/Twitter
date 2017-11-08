window.addEventListener("load", function(){
    //VARIABLES PRINCIPALES
    var textCont = document.getElementById("mensaje");
    var tweetBoton = document.getElementById("btn");
    var contenedorTwets = document.getElementById("container");
    var contador = document.getElementById("cont");
    

    //Función para agrandar TextArea cuando hacemos click
    textCont.addEventListener("click", function(){
        textCont.rows = 5; 
    });



    /*Este evento se activa cuando se suelta una tecla, detecta 
    Click dentro de textArea*/
    textCont.addEventListener("keyup", function(send){
        deshabilitarBoton(textCont);
        contadorCaracteres(textCont);
        var tecla = send.keyCode;
    });


    // HABILITAR Y DESABILITAR EL BOTON
    function deshabilitarBoton(hblt){
        // si tiene entre 1 y 140 caracteres
        if(textCont.value.length <= 140 && textCont.value.length > 0){
            tweetBoton.disabled = false; //habilitar
        }
        //si el contador esta vacio o tiene mas de 140 caracteres 
        else if(hblt.value.trim().length > 140 || hblt.value.trim().length === 0){
            tweetBoton.disabled = true; //desabilitar
        }
    }

    /*  La caja se limpia y regresa a su tamaño original
     luego de enviar el texto, y el boton se vuelve a desabilitar */
    tweetBoton.addEventListener("click", function(send){
        send.preventDefault(); // nuestro evento no se ejecutará
    
    if(textCont.value.length <= 140 && textCont.value.length > 0){
            agregarTweet(textCont.value.trim());
            textCont.value = "";
            contador.textContent = "140";
            contador.style.color = "black";
            textCont.rows = 1;
        }
        tweetBoton.disabled = true; //Desabilitado
    });


// AGREGAR EL TEXTO A UN NUEVO DIV DESDE DOM (AGREGAR TWEET)
    function agregarTweet(texto){
        // nuevo div donde guardaremos nuestro mensaje
        var newTweet = document.createElement("div");
        newTweet.textContent = texto; //escribe el contenido de nuestro mensaje
        // cada mensaje nuevo aparecera al principio
        contenedorTwets.insertBefore(newTweet, contenedorTwets.childNodes[0]);
        // Agregamos el mensaje
        newTweet.classList.add("msj");

// EXTRA Agregar la hora en que fue emitido nuestro mensaje
        var fecha = new Date();
        var hora = fecha.getHours();
        var min = fecha.getMinutes();

        // nuevo div donde irá la hora
        var contenHora = document.createElement("div");
        contenHora.textContent = hora + ":" + min;
        // insertamos la hora antes de nuetro mensaje
        newTweet.insesrtBefore(contenHora,newTweet.childNodes[0]);
    }



// EXTRA, Contador de caracteres (cuenta regesiva con colores)
    function contadorCaracteres(texto){
        var caracteres = texto.value.length;
        contador.textContent = 140 - caracteres;

        if(caracteres >= 120 && caracteres < 130){
            contador.style.color = "green";
        }
        else if (caracteres >130) {
            contador.style.color = "red";
        }
        else{
            contador.style.color = "black";
        }
    }
});

