window.addEventListener('load', function(){ //evento load

    //VARIABLES PRINCIPALES
    var textCont = document.getElementById('mensaje');
    var tweetBoton = document.getElementById('btn');
    var contenedorTwets = document.getElementById('container');
    var contador = document.getElementById('cont');
    
    /*Este evento se activa cuando se suelta una tecla, detecta 
    Click dentro de textArea*/
    textCont.addEventListener('keyup', function(send){ //onkeyup
        deshabilitarBoton(textCont);  // función habilitar / deshabilitar boton
        contadorCaracteres(textCont); //agregar función contador de Caracteres dentro del evento Keyup
    });

    // Habilitar y Deshabilitar Boton
    function deshabilitarBoton(habilitar){
        // si tiene entre 1 y 140 caracteres
        if(textCont.value.length <= 140 && textCont.value.length > 0){
            tweetBoton.disabled = false; //habilitar
        }
        //si el contador esta vacio o tiene mas de 140 caracteres 
        else if(habilitar.value.trim().length > 140 || habilitar.value.trim().length === 0){
            tweetBoton.disabled = true; //desabilitar
        }
    }

    //Función para agrandar TextArea cuando hacemos click y cuando escribimos
     textCont.addEventListener('click', function(){
        textCont.rows = 2; 
    }); 

    textCont.addEventListener('keydown', autoSize);
    function autoSize(){
        var a = this;
        setTimeout(function(){
        a.style.cssText = 'height:auto'; 
        a.style.cssText = 'height:' + a.scrollHeight + 'px';
       },false);
    } 

    // AGREGAR EL TEXTO A UN NUEVO DIV DESDE DOM (AGREGAR TWEET)
    function agregarTweet(texto){
            // nuevo div donde guardaremos nuestro mensaje
            var newTweet = document.createElement('div');
            newTweet.textContent = texto; //escribe el contenido de nuestro mensaje
            // cada mensaje nuevo aparecera al principio
            contenedorTwets.insertBefore(newTweet, contenedorTwets.childNodes[0]);
            // Agregamos el mensaje
            newTweet.classList.add('msj');

    //  Agregar la hora en que fue emitido nuestro mensaje
    var fecha = new Date();
    var hora = fecha.getHours();
    /*var min = fecha.getUTCMinutes();*/
    var min = minDigits();

    // funcion para poner minutos de 2 digitos. ej: 19:02 
    function minDigits() {
        min = fecha.getUTCMinutes();
        if(min < 10) {
            return '0' + min;
        } else {
            return min;
        }
    }
            // nuevo div donde irá la hora
            var contenedorHora = document.createElement('div');
            contenedorHora.textContent = hora + ':' + min;
            // insertamos la hora antes de nuetro mensaje
            newTweet.insertBefore(contenedorHora,newTweet.childNodes[0]);
        }
     /*  La caja se limpia y regresa a su tamaño original
    luego de enviar el texto, y el boton se vuelve a desabilitar */
    tweetBoton.addEventListener('click', function(send){
        send.preventDefault(); // nuestro evento no se ejecutará

        if(textCont.value.length <= 140 && textCont.value.length > 0){
            agregarTweet(textCont.value.trim());
            textCont.value = '';
            contador.textContent = '140';
            contador.style.color = 'black';
            textCont.rows = 1;
        }
        tweetBoton.disabled = true; //Desabilitado
    });

    // Contador de caracteres (cuenta regesiva con colores)
    function contadorCaracteres(texto){
        var caracteres = texto.value.length;
        contador.textContent = 140 - caracteres;
        if(caracteres >= 110 && caracteres < 120){
            contador.style.color = 'green';
        }else if(caracteres >= 120 && caracteres < 130){
            contador.style.color = 'yellow';
        }
        else if (caracteres >=130) {
            contador.style.color = 'red';
        }
        else{
            contador.style.color = 'skyblue';
        }
    }
});

