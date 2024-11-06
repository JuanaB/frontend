import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useSearchParams } from "react-router-dom";
import CartaComponent from "./Carta";


function ResponderIntercambio({modoElegirCarta, cartasData, webSocket2, esTurno, cantidadCartasMano, onClick}) {
  const [searchParams] = useSearchParams();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  
  
  useEffect(() => {
    console.log("aasdasdasdas");
    if(webSocket2){
        webSocket2.onmessage = function(event){
        const data = JSON.parse(event.data);
        console.log("datos recibidosaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", data);
        if(data.event === "intercambio_request") {
            console.log("te estan intercambiando");
            //setModoElegirCarta(true);
            
        }
        if(data.event === "intercambio") {
            console.log("otro esta intercambiando");
        }
        if(data.event === "intercambio exitoso") {
            console.log("intercambio exitoso");
        }
        if(data.event === "fin_de_turno") {
            console.log("fin de turno");
            window.location.reload();
        }            
        }
    }
    //const algunaCartaEsDefensa = jugadorActual.cartas.some(carta => carta.tipo === 'defensa');
    //setModoDefensa(algunaCartaEsDefensa);
  }, [webSocket2, modoElegirCarta]);


  const handleElegirCarta = (cartaSeleccionada) => {

    // Enviar la carta seleccionada al servidor a través de WebSocket
    // const mensaje = {
    //     'aceptado': true,
    //   'data': cartaSeleccionada.id,
    // };

    // const mensajeJSON = JSON.stringify(mensaje);
    // webSocket2.send(mensajeJSON);
  
};

  return (
    <div className="row">
      
    {modoElegirCarta && (
    
      <div className="row justify-content-center">
        {cartasData.map((carta) => ( // esto esta copiado de partidaencurso, te deja seleccionar las cartas, se ve desfasado (hay que arreglar)
          <div className="col-md-auto" key={carta.id}>
              {(<CartaComponent
                carta={carta}
                esTurnoIntercambiarCarta={modoElegirCarta}
                onClickIntercambiarCarta={handleElegirCarta} // se le pasa la funcion (esto creo que no hace nada, que se hace cuando apretas el boton, habria que pasar otra cosa, no se xd)
              />)}
            </div>
          ))}  
      </div>
        
    )}
    
    
    { modoElegirCarta && (<div className="text-center mt-3">
      <button onClick={handleElegirCarta} className="btn btn-primary">
        Intercambiar Carta
      </button>
    </div>)}
    </div>
    
    
  );
}

export default ResponderIntercambio;
